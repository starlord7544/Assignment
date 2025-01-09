let keyword = 'keyword'
let API_KEY = "283ff7237abe41a8a173fc18448d1e3c"
const searchInput = document.getElementById('search')
const btn = document.querySelector('.search-logo')
const content = document.querySelector('.content')

const language = document.getElementById('language')
const sortBY = document.getElementById('sort')
const searchIn = document.getElementById('search-in')


let newsData = {}

if (searchInput.value!== '')
    keyword = searchInput.value

searchInput.addEventListener('input', (e) => {
    keyword = e.target.value
    console.log(keyword)
})

searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        btn.click()
    }
})

const fetchData = async () => {
    // const URL = `https://newsapi.org/v2/everything?q=${keyword}&apiKey=${API_KEY}`
    let URL = `https://newsapi.org/v2/everything?q=${keyword}`
    if (sortBY.value !== 'none')
        URL += `&sortBy=${sortBY.value}`
    
    if (language.value !== 'none')
        URL += `&language=${language.value}`
    
    if (searchIn.value !== 'all')
        URL += `&searchIn=${searchIn.value}`
    
    URL += `&apiKey=${API_KEY}`
    console.log(URL)
    try {
        const res = await fetch(URL)
        const data = await res.json()
        newsData = data
        console.log(newsData)
        addNews(newsData)
    }
    catch (err) {
        console.log(err)
    }
}

const addNews = (newsData) => {
    newsData.articles.forEach(article => {      
        const card = createEle('div', 'card')

        const sourceDiv = createEle('div','source')
        const anc = createEle('a', 'anchor')
        anc.href = article.url
        anc.textContent = article.source.name
        sourceDiv.appendChild(anc)

        const imageDiv = createEle('div', 'image')
        const img = createEle('img', 'img')
        img.src = article.urlToImage
        imageDiv.appendChild(img)

        const info = createEle('div', 'info')
        const title = createEle('div', 'title')
        
        const meta = createEle('div', 'meta')
        const author = createEle('span', 'author')
        const dateTime = createEle('span', 'dateTime')

        meta.appendChild(author)
        meta.appendChild(dateTime)

        const description = createEle('div', 'description')

        info.appendChild(title)
        info.appendChild(meta)
        info.appendChild(description)

        card.appendChild(sourceDiv)
        card.appendChild(imageDiv)
        card.appendChild(info)

        title.textContent = article.title
        author.textContent = `By ${article.author}`
        dateTime.textContent = article.publishedAt
        description.textContent = article.description

        content.appendChild(card)
    })
}

const createEle = (tag, className) => {
    const ele = document.createElement(tag)
    ele.classList.add(className)
    return ele
}

btn.addEventListener("click", () => {
    content.innerHTML = ''
    console.log('clicked')
    if (keyword === '')
        keyword = 'keyword'
    fetchData() 
})


