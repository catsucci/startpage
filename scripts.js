/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "duckduckgo"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"ECMIpL8cxzmPVHBZ","label":"reddit","bookmarks":[{"id":"1gKcIIwUJ2lD0Y4G","label":"r/startpages","url":"https://www.reddit.com/r/startpages/"},{"id":"eJnabeBOAT2SP414","label":"r/typescript","url":"https://www.reddit.com/r/typescript/"},{"id":"YoQLjmBPArO1VFqh","label":"r/reactjs","url":"https://www.reddit.com/r/reactjs/"}]},{"id":"2Dng6U6Zx8SVyVvG","label":"design tools","bookmarks":[{"id":"FvzYfcb9kl21fcj0","label":"pixlrx","url":"https://pixlr.com/x/"},{"id":"DhwgTGpp5bOvPpXg","label":"image enlarger","url":"https://bigjpg.com/en"},{"id":"XqM1xMoQvUL9XMpH","label":"haikei","url":"https://app.haikei.app/"},{"id":"tjZCefLvHPOF0lOw","label":"css gradients","url":"https://larsenwork.com/easing-gradients/"}]},{"id":"5vbBw3s4G6p5e4rT","label":"worth reading","bookmarks":[{"id":"NChVh1sbImQMUh9C","label":"happy hues","url":"https://www.happyhues.co/"},{"id":"c07q2kw358MxDfms","label":"styled-components","url":"https://www.joshwcomeau.com/react/demystifying-styled-components/"},{"id":"ZQvivFNzntot9iS6","label":"react docs","url":"https://reactjs.org/docs/getting-started.html"}]},{"id":"YWG3lCn5WMV5Epma","label":"sources","bookmarks":[{"id":"srV2C1d2jxDuA1DB","label":"icons","url":"https://feathericons.com/"},{"id":"yRrPHICSBvJh2bXf","label":"gif","url":"https://designyoutrust.com/2019/05/the-chill-and-retro-motion-pixel-art-of-motocross-saito/"},{"id":"wLvtNGe37Kro2HUz","label":"@startpage","url":"https://prettycoffee.github.io/startpage"},{"id":"isXo4nS0tIfAZspE","label":"author","url":"https://prettycoffee.github.io/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
