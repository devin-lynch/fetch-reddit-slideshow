document.addEventListener('DOMContentLoaded', () => {

    const searchButton = document.querySelector('#search-button')
    const input = document.querySelector('input')
    const form = document.querySelector('form')
    const hideDiv = document.querySelector('#hide')
    const results = document.querySelector('#results')
    const body = document.querySelector('body')
    
    form.addEventListener('submit', e => {
        e.preventDefault()
        const url = `https://www.reddit.com/search.json?q=${input.value}+nsfw:no`
        hideDiv.style.visibility = 'hidden'
        console.log(input.value)
        // step 1 -- fetch data
        fetch(url)
        //step 2 -- jsonify data
        .then(searchData => {
            return searchData.json()
        })
        // step 3 -- do something neat with json data
        .then(searchJson => {
            console.log(searchJson.data.children)
            const imgParent = searchJson.data.children
            // console.log(imgParent[0].data.thumbnail)
            imgParent.forEach(result => {
                const img = document.createElement('img')
                img.classList.add('resultImage')
                img.src = result.data.thumbnail
                img.alt = result.data.title
                results.appendChild(img)
                // img.style.display = "flex"
            })
            let slideIndex = 0
            function showSlides() {
                let i;
                let slides = document.getElementsByClassName('resultImage')
                for (i = 0; i < slides.length; i++) {
                    slides[i].style.display = 'none';
                }
                slideIndex++;
                if (slideIndex > slides.length) {slideIndex = 1}
                slides[slideIndex-1].style.display = 'block';
                setTimeout(showSlides, 1000); // changes img every second
            }
            showSlides()


            const clearButton = document.createElement('button')
            clearButton.classList.add('clear')
            clearButton.innerText = 'Reset'
            body.appendChild(clearButton)
            clearButton.addEventListener('click', () => {
                hideDiv.style.visibility = 'visible'
                clearButton.style.visibility = 'hidden'
                input.value = ""
                while (results.hasChildNodes) {
                    results.removeChild(results.firstChild)
                }
            })   
        })
        .catch(err => {
            console.warn(err)
        })
    })
})
            // step 4 -- be a good programmer and handle errors
            // .catch(console.warn)
      
   


