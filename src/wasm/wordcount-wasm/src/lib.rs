use wasm_bindgen::prelude::*;
use jieba_rs::{Jieba, Tag};
use once_cell::sync::Lazy;
use serde::Serialize;

static JIEBA: Lazy<Jieba> = Lazy::new(|| {
    Jieba::new()
});


#[derive(Serialize)]
pub struct WordInfo {
    pub word: String,
    pub tag: String,
}

#[wasm_bindgen]
pub fn word_count(text: &str) -> JsValue {
    let tagged: Vec<Tag> = JIEBA.tag(text, true);
    let result: Vec<WordInfo> = tagged
        .into_iter()
        .map(|t| WordInfo {
            word: t.word.to_string(),
            tag: t.tag.to_string(),
        })
        .collect();

    serde_wasm_bindgen::to_value(&result).unwrap()
}
