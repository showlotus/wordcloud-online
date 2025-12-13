#!/usr/bin/env node

/**
 * 版本发布脚本
 * 更新 package.json 版本号，创建 commit，打 tag，并推送到远端
 * 用法: node scripts/release.js [major|minor|patch]
 * 默认: patch
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '..');
const packageJsonPath = resolve(projectRoot, 'package.json');

/**
 * 获取当前版本号
 */
function getCurrentVersion() {
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
  return packageJson.version;
}

/**
 * 计算新版本号
 * @param {string} currentVersion 当前版本号
 * @param {string} type 版本类型 major|minor|patch
 */
function calculateNewVersion(currentVersion, type) {
  const [major, minor, patch] = currentVersion.split('.').map(Number);

  switch (type) {
    case 'major':
      return `${major + 1}.0.0`;
    case 'minor':
      return `${major}.${minor + 1}.0`;
    case 'patch':
      return `${major}.${minor}.${patch + 1}`;
    default:
      throw new Error(`不支持的版本类型: ${type}`);
  }
}

/**
 * 更新 package.json 中的版本号
 * @param {string} newVersion 新版本号
 */
function updatePackageVersion(newVersion) {
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
  packageJson.version = newVersion;
  writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n', 'utf-8');
}

/**
 * 检查工作区是否干净
 */
function checkWorkingDirectoryClean() {
  try {
    const status = execSync('git status --porcelain', {
      cwd: projectRoot,
      encoding: 'utf-8',
    });
    if (status.trim()) {
      console.error('❌ 工作区不干净，请先提交或暂存所有更改');
      console.error('   未提交的文件:');
      console.error(status);
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ 检查工作区状态失败:', error.message);
    process.exit(1);
  }
}

/**
 * 创建版本 commit
 * @param {string} newVersion 新版本号
 */
function createVersionCommit(newVersion) {
  try {
    execSync('git add package.json', {
      cwd: projectRoot,
      stdio: 'inherit',
    });

    execSync(`git commit -m "chore: bump version to ${newVersion}"`, {
      cwd: projectRoot,
      stdio: 'inherit',
    });
  } catch (error) {
    console.error('❌ 创建 commit 失败:', error.message);
    process.exit(1);
  }
}

/**
 * 创建版本 tag
 * @param {string} version 版本号
 */
function createVersionTag(version) {
  const tagName = `v${version}`;
  try {
    // 检查 tag 是否已存在
    try {
      execSync(`git rev-parse -q --verify "refs/tags/${tagName}"`, {
        cwd: projectRoot,
        stdio: 'pipe',
      });
      console.error(`❌ Tag ${tagName} 已存在`);
      process.exit(1);
    } catch (error) {
      // Tag 不存在，继续创建
    }

    execSync(`git tag -a ${tagName} -m "Release ${tagName}"`, {
      cwd: projectRoot,
      stdio: 'inherit',
    });
    return tagName;
  } catch (error) {
    console.error('❌ 创建 tag 失败:', error.message);
    process.exit(1);
  }
}

/**
 * 推送到远端
 * @param {string} tagName tag 名称
 */
function pushToRemote(tagName) {
  try {
    // 获取当前分支名
    const branch = execSync('git symbolic-ref --short HEAD', {
      cwd: projectRoot,
      encoding: 'utf-8',
    }).trim();

    console.log(`🚀 推送 commit 到远端分支 ${branch}...`);
    execSync(`git push origin ${branch}`, {
      cwd: projectRoot,
      stdio: 'inherit',
    });

    console.log(`🚀 推送 tag ${tagName} 到远端...`);
    execSync(`git push origin ${tagName}`, {
      cwd: projectRoot,
      stdio: 'inherit',
    });
  } catch (error) {
    console.error('❌ 推送到远端失败:', error.message);
    console.error('💡 提示: 请检查网络连接和远端仓库权限');
    process.exit(1);
  }
}

/**
 * 主函数
 */
function main() {
  // 解析命令行参数
  const versionType = process.argv[2] || 'patch';

  // 验证版本类型
  if (!['major', 'minor', 'patch'].includes(versionType)) {
    console.error(`❌ 无效的版本类型: ${versionType}`);
    console.error('💡 用法: node scripts/release.js [major|minor|patch]');
    console.error('💡 默认: patch');
    process.exit(1);
  }

  console.log('🚀 开始版本发布流程...\n');

  // 检查工作区是否干净
  console.log('🔍 检查工作区状态...');
  checkWorkingDirectoryClean();
  console.log('✅ 工作区干净\n');

  // 获取当前版本
  const currentVersion = getCurrentVersion();
  console.log(`📦 当前版本: ${currentVersion}`);

  // 计算新版本
  const newVersion = calculateNewVersion(currentVersion, versionType);
  console.log(`📦 新版本: ${newVersion} (${versionType})\n`);

  // 更新 package.json
  console.log('📝 更新 package.json...');
  updatePackageVersion(newVersion);
  console.log('✅ package.json 已更新\n');

  // 创建 commit
  console.log('📝 创建版本 commit...');
  createVersionCommit(newVersion);
  console.log('✅ Commit 已创建\n');

  // 创建 tag
  console.log('🏷️  创建版本 tag...');
  const tagName = createVersionTag(newVersion);
  console.log(`✅ Tag ${tagName} 已创建\n`);

  // 推送到远端
  console.log('🚀 推送到远端...');
  pushToRemote(tagName);
  console.log('\n✅ 版本发布完成！');
  console.log(`📦 版本: ${newVersion}`);
  console.log(`🏷️  Tag: ${tagName}`);
}

// 执行主函数
main();
