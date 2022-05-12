/******************************************************************************
* How to Mass Import Muted Words into Twitter using the Google Chrome Console *
******************************************************************************/

/**
  * Problem: There is no easy way to mass import muted words into Twitter if you're setting up a new list.
  * Solution: We can use the Google Chrome developer tools console to run a Javascript command that adds this functionality for us.
  * Inspiration: A comment on Github from a user named freedmand.
  * Link: https://gist.github.com/IanColdwater/88b3341a7c4c0cf71c73ac56f9bd36ec
  * Comment: https://gist.github.com/IanColdwater/88b3341a7c4c0cf71c73ac56f9bd36ec?permalink_comment_id=3153244#gistcomment-3153244
  */

/**
  * Documentation:
  * - chrome.autofillPrivate.saveAddress(address) documented at https://source.chromium.org/chromium/chromium/src/+/main:chrome/browser/resources/settings/autofill_page/autofill_section.js;drc=31944011fe8ab26755dce300b1ec86c311860609;l=68
  * - Supported fields and their types documented at https://source.chromium.org/chromium/chromium/src/+/main:third_party/closure_compiler/externs/autofill_private.js
  */

/**
  * Procedure:
  * 1. Go to chrome://settings/addresses
  * 2. Open the devtools Javascript console (option + command + j)
  * 3. Run the Javascript code below to add an input button in the top right corner of the page.
  * 4. Use this button to import a .csv file with all of the addresses and other information you'd like to import.
  *
  * NOTE: The .csv file doesn't need headings, just put in each entry in the order listed below.
  * NOTE: The whole thing breaks if any cell in the .csv has a comma, so please remove any from the file.
  */

/*********************
* Start Code Snippet *
*********************/

// Set how fast the program runs.
const delayMs = 750;

// Set the words or phrases you want to mute.
const keywords = `ActivityTweet
generic_activity_highlights
generic_activity_momentsbreaking
RankedOrganicTweet
suggest_activity
suggest_activity_feed
suggest_activity_highlights
suggest_activity_tweet
suggest_grouped_tweet_hashtag
suggest_pyle_tweet
suggest_ranked_organic_tweet
suggest_ranked_timeline_tweet
suggest_recap
suggest_recycled_tweet
suggest_recycled_tweet_inline
suggest_sc_tweet
suggest_timeline_tweet
suggest_who_to_follow
suggestactivitytweet
suggestpyletweet
suggestrecycledtweet_inline`.split(/\W+/);

const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;

const addMutedKeyword = keyword => {
  const input = document.querySelector("[name='keyword']");
  nativeInputValueSetter.call(input, keyword);
  input.dispatchEvent(new Event('input', { bubbles: true }));
  document.querySelector("[data-testid='settingsDetailSave']").click();
}

const delay = () => {
  return new Promise(res => setTimeout(res, delayMs));
};

keywords.reduce(async (prev, keyword) => {
  await prev;
  document.querySelector("a[href='/settings/add_muted_keyword']").click();
  await delay();
  addMutedKeyword(keyword);
  return delay();
}, Promise.resolve());
