const accessKey = '_XZg3vbKHattOLyAGBE6H8qA1WG8Y8K9BoQLN1TcwX4';
const searchForm = document.querySelector('form');
const searchInput = document.querySelector('.search-input');
const imageContainer = document.querySelector('.image-container');
const lodeMoreBtn = document.querySelector('.lodeMoreBtn');

let page = 1;


// function to fache images using api

const fetchImage = async(query, pageNo) => {

    try{


    if(pageNo === 1){
        imageContainer.innerHTML = '';

    }
    const url = `https://api.unsplash.com/search/photos/?query=${query}&per_page=28&page=${pageNo}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    // console.log(data);

    if(data.results.length > 0){
        data.results.forEach(photo => {

            // creating image div
            const imageElement = document.createElement('div');
            imageElement.classList.add('imageDiv')
            imageElement.innerHTML = `<img src="${photo.urls.regular}"/>`;
    
            // creating overlay
            const overlayElement = document.createElement('div')
            overlayElement.classList.add('overlay');
    
            // create overlay text
    
            const overlaytext = document.createElement('h3');
            overlaytext.innerText = `${photo.alt_description}`;
    
            overlayElement.appendChild(overlaytext);
    
            imageElement.appendChild(overlayElement);
            imageContainer.appendChild(imageElement);
    
            imageContainer.appendChild(imageElement);
        })
    
        if(data.total_pages === pageNo){
            lodeMoreBtn.style.display = 'none';
        }
        else{
            lodeMoreBtn.style.display = 'block';
        }

    }
    else{
        imageContainer.innerHTML = `<h2> No image found</h2>`;
        if(lodeMoreBtn.style.display === "block"){
            lodeMoreBtn.style.display = 'none';
        }
    
    }

    }
    catch(error){
        imageContainer.innerHTML = `<h2> Failed to fatch images. Please try again later </h2>`;
    }

   
}
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputText = searchInput.value.trim();
    if (inputText !== '') {
         page = 1;
        fetchImage(inputText, page);
    }
    else {
        imageContainer.innerHTML = `<h2> Please enter a search query</h2>`;

        if(lodeMoreBtn.style.display === "block"){
            lodeMoreBtn.style.display = 'none';
        }
    }

})


// adding evint buttone 

lodeMoreBtn.addEventListener('click', () => {
    fetchImage(searchInput.value.trim(), ++page);
})