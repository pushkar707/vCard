// preview scroll
const preview = document.getElementById('preview')
if(window.innerWidth>1000){
    window.addEventListener('scroll',()=>{
        if(window.scrollY>720 && document.body.offsetHeight-window.scrollY>1000){
            preview.style.top = `${window.scrollY-720}px`
        }
    })
}

// BRAND LOGO IMAGE
const brandLogoInput = document.getElementById('brand-logo-input')
brandLogoInput.addEventListener('change', (e)=> {
    const url = URL.createObjectURL(e.target.files[0])
    const img = document.createElement('img')
    img.src=url
    img.id="brand-logo-preview-image"
    const brandLogoPreview = document.getElementById('brand-logo-preview')
    brandLogoPreview.innerHTML = ""
    brandLogoPreview.append(img)

    const brandLogoInputContainer = document.getElementById('brand-logo-input-container')
    const brandLogoContainer = document.getElementById('brand-logo-container')
    brandLogoInputContainer.style.display = 'none'
    const div = document.createElement('div')
    div.id = "brand-logo-remove"
    div.innerHTML = `
    <img src=${url} width="60px" height="32px">
    <button onclick="removeBrandLogo()" class="btn"><i class="fa-solid fa-x"></i></button>
    `
    brandLogoContainer.append(div)
})

const removeBrandLogo = () => {
    document.getElementById('brand-logo-remove').remove()
    const brandLogoInputContainer = document.getElementById('brand-logo-input-container')
    brandLogoInputContainer.style.display = 'unset'
    const brandLogoPreview = document.getElementById('brand-logo-preview')
    brandLogoPreview.innerHTML = ""
}

const headshotInput = document.getElementById('headshot-input')
headshotInput.addEventListener('change',(e)=>{
    const url = URL.createObjectURL(e.target.files[0])
    const img = document.createElement('img')
    img.src=url
    img.id = "headshot-preview-image"
    const headshotPreview = document.getElementById('headshot-preview')
    headshotPreview.innerHTML = ""
    headshotPreview.append(img)

    const headshotInputContainer = document.getElementById('headshot-input-container')
    const headshotContainer = document.getElementById('headshot-container')
    headshotInputContainer.style.display = 'none'
    const div = document.createElement('div')
    div.id = 'headshot-remove'
    div.innerHTML = `
    <img src=${url} width="60px" height="32px">
    <button onclick="removeHeadshot()" class="btn"><i class="fa-solid fa-x"></i></button>
    `
    headshotContainer.append(div)
})

const removeHeadshot = () => {
    document.getElementById('headshot-remove').remove()
    const headshotInputContainer = document.getElementById('headshot-input-container')
    headshotInputContainer.style.display = 'unset'
    const headshotPreview = document.getElementById('headshot-preview')
    headshotPreview.innerHTML = ""
}

// BASIC INFO
const addPrefix = value => {
    document.getElementById('prefix-vcf-input').value = value
    document.getElementById('prefix-output').innerText = value
}
const addFirstName = value => {
    document.getElementById('first-name-vcf-input').value = value
    document.getElementById('fname-output').innerText = value
}
const addLastName = value => {
    document.getElementById('last-name-vcf-input').value = value
    document.getElementById('lname-output').innerText = value
}
const addGenderPronouns = value => {
    document.getElementById('pronouns').innerText = `(${value})`
}
const addJobTitle = value => {
    document.getElementById('job-title-vcf-input').value = value
    document.getElementById('job').innerText = value
}
const addBusinessName = value => {
    document.getElementById('business-name-vcf-input').value = value
    document.getElementById('bname').innerText = value
}
const addBusinessAddress = value => {
    document.getElementById('business-address-vcf-input').value = value
    document.getElementById('baddress').innerText = value
}
const addBusinessDescription = value => {
    document.getElementById('business-description-vcf-input').value = value
    document.getElementById('bdescription').innerText = value
}
const addFooter = value => {
    document.getElementById('footer-output').innerText = value
}

// PRIMARY ACTIONS
const addAction = (html,action,index) => {
    const actions = document.getElementById('primary-contacts')
    const inputs = document.getElementById('action-inputs-primary')
    document.getElementById('primary-icon-'+index).style.display = 'none'
    actions.innerHTML += `<a href="" id="preview-primary-icon-${index}" target="_blank"><button title="${action.toUpperCase()}" class="icon">${html}</button></a>`
    let input = null
    if (action == 'phone'){
        input = `
        <div class="d-flex mb-3 align-items-center" id="primary-icon-input-${index}">
            <button class="icon">${html}</button></a>
            <input oninput="addLink('${action}',${index})" id="primary-input-${index}" type="number" class="form-control" placeholder="Phone Number">
            <button onclick="removeAction(${index})" class="btn"><i class="fa-solid fa-x"></i></button>
        </div>
        `
    }
    else if(action == "messenger"){
        input = `
        <div class="d-flex mb-3 align-items-center" id="primary-icon-input-${index}">
            <button class="icon">${html}</button></a>
            <input oninput="addLink('${action}',${index})" id="primary-input-${index}" type="text" class="form-control" placeholder="Messenger Username">
            <button onclick="removeAction(${index})" class="btn"><i class="fa-solid fa-x"></i></button>
        </div>
        `
    }
    else if(action == "whatsapp"){
        input = `
        <div class="d-flex mb-3 align-items-center" id="primary-icon-input-${index}">
            <button class="icon">${html}</button></a>
            <input oninput="addLink('${action}',${index})" id="primary-input-${index}" type="number" class="form-control" placeholder="Whatsapp Number">
            <button onclick="removeAction(${index})" class="btn"><i class="fa-solid fa-x"></i></button>
        </div>
        `
    }
    else if(action == "telegram"){
        input = `
        <div class="d-flex mb-3 align-items-center" id="primary-icon-input-${index}">
            <button class="icon">${html}</button></a>
            <input oninput="addLink('${action}',${index})" id="primary-input-${index}" type="text" class="form-control" placeholder="Telegram Username">
            <button onclick="removeAction(${index})" class="btn"><i class="fa-solid fa-x"></i></button>
        </div>
        `
    }
    else if(action == "mail"){
        input = `
        <div class="d-flex mb-3 align-items-center" id="primary-icon-input-${index}">
            <button class="icon">${html}</button></a>
            <input oninput="addLink('${action}',${index})" id="primary-input-${index}" type="email" class="form-control" placeholder="Email Address">
            <button onclick="removeAction(${index})" class="btn"><i class="fa-solid fa-x"></i></button>
        </div>
        `
    }
    else if(action == "skype"){
        input = `
        <div class="d-flex mb-3 align-items-center" id="primary-icon-input-${index}">
            <button class="icon">${html}</button></a>
            <input oninput="addLink('${action}',${index})" id="primary-input-${index}" type="text" class="form-control" placeholder=" Skype Username">
            <button onclick="removeAction(${index})" class="btn"><i class="fa-solid fa-x"></i></button>
        </div>
        `
    }
    else if(action == "website"){
        input = `
        <div class="d-flex mb-3 align-items-center" id="primary-icon-input-${index}">
            <button class="icon">${html}</button></a>
            <input oninput="addLink('${action}',${index})" id="primary-input-${index}" type="text" class="form-control" placeholder="Website URL">
            <button onclick="removeAction(${index})" class="btn"><i class="fa-solid fa-x"></i></button>
        </div>
        `
    }
    else if(action == "store"){
        input = `
        <div class="d-flex mb-3 align-items-center" id="primary-icon-input-${index}">
            <button class="icon">${html}</button></a>
            <input oninput="addLink('${action}',${index})" id="primary-input-${index}" type="text" class="form-control" placeholder="Store URL">
            <button onclick="removeAction(${index})" class="btn"><i class="fa-solid fa-x"></i></button>
        </div>
        `
    }
    else if(action == "location"){
        input = `
        <div class="d-flex mb-3 align-items-center" id="primary-icon-input-${index}">
            <button class="icon">${html}</button></a>
            <input oninput="addLink('${action}',${index})" id="primary-input-${index}" type="text" class="form-control" placeholder="Enter URL">
            <button onclick="removeAction(${index})" class="btn"><i class="fa-solid fa-x"></i></button>
        </div>
        `
    }else if(action == "viber"){
        input = `
        <div class="d-flex mb-3 align-items-center" id="primary-icon-input-${index}">
            <button class="icon">${html}</button></a>
            <input oninput="addLink('${action}',${index})" id="primary-input-${index}" type="text" class="form-control" placeholder="Enter URL">
            <button onclick="removeAction(${index})" class="btn"><i class="fa-solid fa-x"></i></button>
        </div>
        `
    }else if(action == "sms"){
        input = `
        <div class="d-flex mb-3 align-items-center" id="primary-icon-input-${index}">
            <button class="icon">${html}</button></a>
            <input oninput="addLink('${action}',${index})" id="primary-input-${index}" type="text" class="form-control" placeholder="Enter URL">
            <button onclick="removeAction(${index})" class="btn"><i class="fa-solid fa-x"></i></button>
        </div>
        `
    }else if(action == "calender"){
        input = `
        <div class="d-flex mb-3 align-items-center" id="primary-icon-input-${index}">
            <button class="icon">${html}</button></a>
            <input oninput="addLink('${action}',${index})" id="primary-input-${index}" type="text" class="form-control" placeholder="Enter URL">
            <button onclick="removeAction(${index})" class="btn"><i class="fa-solid fa-x"></i></button>
        </div>
        `
    }else if(action == "line"){
        input = `
        <div class="d-flex mb-3 align-items-center" id="primary-icon-input-${index}">
            <button class="icon">${html}</button></a>
            <input oninput="addLink('${action}',${index})" id="primary-input-${index}" type="text" class="form-control" placeholder="Enter URL">
            <button onclick="removeAction(${index})" class="btn"><i class="fa-solid fa-x"></i></button>
        </div>
        `
    }
    const myDiv = document.createElement('div')
    myDiv.innerHTML = input
    inputs.insertAdjacentElement('beforeend',myDiv)
}

const removeAction = (index) => {
    document.getElementById(`preview-primary-icon-${index}`).remove()
    document.getElementById(`primary-icon-input-${index}`).remove()
    document.getElementById('primary-icon-'+index).style.display = 'unset'
}

const addLink = (action,index) => {
    const previewBtn = document.getElementById(`preview-primary-icon-${index}`)
    const value = document.getElementById(`primary-input-${index}`).value
    if (action=='phone') {
        document.getElementById('mobile-work-vcf-input').value = value
        previewBtn.setAttribute('href',`tel:${value}`)
    }
    else if(action == "messenger"){
        previewBtn.setAttribute('href',`https://m.me/${value}`)
    }
    else if(action == "whatsapp"){
        previewBtn.setAttribute('href',`https://wa.me/${value}`)
    }
    else if(action == "telegram"){
        previewBtn.setAttribute('href',`https://t.me/${value}`)
    }
    else if(action == "mail"){
        document.getElementById('email-vcf-input').value = value
        previewBtn.setAttribute('href',`mailto:${value}`)
    }
    else if(action == "skype"){
        previewBtn.setAttribute('href',`skype:${value}?chat`)
    }
    else if(action == "website"){
        document.getElementById('website-vcf-input').value = value
        previewBtn.setAttribute('href',value)
    }
    else if(action == "store" || action == "line" || action == "viber" || action == "sms" || action == "calender" || action == "location"){
        previewBtn.setAttribute('href',value)
    }

}

// SECONDARY ACTIONS
const addSecondaryAction = (title,index) => {
    const secondaryPreview = document.getElementById('secondary-actions')
    const secondaryInputs = document.getElementById('action-inputs-secondary')
    document.getElementById('secondary-icon-'+index).style.display = 'none'
    secondaryPreview.innerHTML+=`<a href="" target="_blank" id="preview-secondary-icon-${index}"><img class="icon-secondary"  title="${title}" src="/static/img/${title}.png" alt=""></a>`
    
    const input = `
    <div class="d-flex align-items-center" id="secondary-icon-input-${index}">
        <img class="icon-secondary" title="${title}" src="/static/img/${title}.png" alt="">
        <input oninput="addSecondaryLink(${index})" id="secondary-input-${index}" type="text" class="form-control" placeholder="Enter URL">
        <button onclick="removeSecondaryAction(${index})" class="btn"><i class="fa-solid fa-x"></i></button>
    </div>
    `
    const myDiv = document.createElement('div')
    myDiv.innerHTML = input
    secondaryInputs.insertAdjacentElement('beforeend',myDiv)
}

const addSecondaryLink = index => {
    const previewIcon = document.getElementById('preview-secondary-icon-'+index)
    const value = document.getElementById(`secondary-input-${index}`).value
    previewIcon.setAttribute('href',value)

    // VCF FORM
    if(index == 6){ // Facebook
        document.getElementById('facebook-vcf-input').value = value
    }
    else if(index==7){
        document.getElementById('github-vcf-input').value = value
    }
    else if(index==8){
        document.getElementById('instagram-vcf-input').value = value
    }
    else if(index==9){
        document.getElementById('linkedin-vcf-input').value = value
    }
    else if(index==21){
        document.getElementById('twitter-vcf-input').value = value
    }
}

const removeSecondaryAction = (index) => {
    document.getElementById(`preview-secondary-icon-${index}`).remove()
    document.getElementById(`secondary-icon-input-${index}`).remove()
    document.getElementById('secondary-icon-'+index).style.display = 'unset'
}


// FEATURED CONTENT

const addSection = () => {
    const featuredSection = document.getElementById('section')
    const div = document.createElement('div')
    div.classList.add('mb-4','transition')
    const index = document.getElementsByClassName('featured-content-section').length+1
    div.id = `featured-section-${index}`
    div.innerHTML=`
    <div class="featured-content-section">
        <input type="text" class="form-control" placeholder="Enter Title" oninput="addSectionTitlePreview(${index},this.value)">
        <i class="fa-solid fa-x" onclick="removeSection(${index})"></i>
        <div id="featured-content-input-${index}" class="featured-content-input"></div>
            <div class="featured-content-options">
                <div class="featured-content-option" onclick="addMedia(${index})">
                    <i class="fa-regular fa-file"></i>
                    Select Media
                </div>
                <div class="featured-content-option" onclick="addText(${index})">
                    <i class="fa-solid fa-font"></i>
                    Add Text
                </div>
                <div class="featured-content-option" onclick="addProduct(${index})">
                    <!-- <i class="fa-solid fa-boxes-stacked"></i> -->
                    <i class="fa-solid fa-box-open"></i>
                    Add Product
                </div>
                <div class="featured-content-option" onclick="addButton(${index})">
                    <i class="fa-solid fa-audio-description"></i>
                    Custom Button
                </div>
                <div class="featured-content-option" onclick="addEmbedCode(${index})">
                    <i class="fa-solid fa-code"></i>
                    Embed Code
                </div>
            </div>
        </div>
    `
    featuredSection.append(div)
    // PREVIEW
    const preview = document.getElementById('featured-content-preview')
    const previewDiv = document.createElement('div')
    previewDiv.id = `featured-section-preview-${index}`
    previewDiv.classList.add('featured-section-preview')
    previewDiv.innerHTML = `
    <h3 id="featured-section-preview-title-${index} h3" class="text"></h3>
    `
    preview.append(previewDiv)
}

const removeSection = index => {
    document.getElementById('featured-section-'+index).remove()
    document.getElementById('featured-section-preview-'+index).remove()
}

const addSectionTitlePreview = (index,title) => {
    const previewTitle = document.getElementById(`featured-section-preview-title-${index}`)
    previewTitle.innerText = title
}

const addMedia = (index) => {
    const mediaCount = document.getElementById('featured-media-count')
    if(parseInt(mediaCount.value)<10){
        mediaCount.value = parseInt(mediaCount.value)+1

        const featuredContentInput = document.getElementById('featured-content-input-'+index)
        const featuredMedias = document.querySelectorAll('.featured-media-preview')
        ids = []
        featuredMedias.forEach(media=> {
            ids.push(parseInt(media.id[media.id.length-1]))
        })
        const index2 = Math.max(...ids)>=1 ? Math.max(...ids)+1 : 1

        const labeldiv = document.createElement('div')
        labeldiv.id=`featured-media-${index2}`
        labeldiv.classList.add("featured-media")
        labeldiv.innerHTML = `
        <div class="d-flex align-items-center">
            <label for="featured-media-form-${index2}" class="media-input p-2 d-flex align-items-center" id="featured-media-label-${index2}">
                <span class="mx-2 img-btn"><i class="fa-solid fa-plus"></i></span>Choose Media
            </label>
            <i class="fa-solid fa-x ms-1" onclick="removeMedia(${index2})"></i>
        </div>
        `        
        
        featuredContentInput.append(labeldiv)

        const inputDiv = document.createElement('div')
        inputDiv.id = `featured-media-input-${index2}`
        inputDiv.classList.add('d-none')
        inputDiv.innerHTML = `
        <input class="media-input-preview" name="media-${mediaCount.value}" type="file" accept="image/*" oninput="addPreviewMedia(${index2})" id="featured-media-form-${index2}" placeholder="Choose Media">
        `

        // ADDING INPUT IN ADD FORM
        const addFormBody = document.getElementById('add-card-form-body')
        addFormBody.append(inputDiv)

        // CREATING PREVIEW DIV
        const featuredSection = document.getElementById(`featured-section-preview-${index}`)
        const mediaDiv = document.createElement('div')
        mediaDiv.id = `featured-media-preview-${index2}`
        mediaDiv.classList.add('featured-media-preview')
        featuredSection.append(mediaDiv)
        }
    
}

const addPreviewMedia = index => {
    const mediaDiv = document.getElementById(`featured-media-preview-${index}`)
    mediaDiv.classList.add('featured-media')
    document.getElementById(`featured-media-form-${index}`).addEventListener('change',(e)=>{
        const url = URL.createObjectURL(e.target.files[0])
        const img = document.createElement('img')
        img.classList.add('preview-media')
        img.src=url
        mediaDiv.innerHTML = ""
        mediaDiv.append(img)

        // changing label content
        const mediaLabel = document.getElementById(`featured-media-label-${index}`)
        mediaLabel.innerHTML = `<img src=${url} width="60px" height="32px">`
    })
}

const removeMedia = index => {
    document.getElementById(`featured-media-${index}`).remove()
    document.getElementById(`featured-media-preview-${index}`).remove()
    document.getElementById(`featured-media-input-${index}`).remove()
    const count = document.getElementById('featured-media-count')
    count.value = parseInt(count.value)-1
}

const addText = (index) => {
    const featuredContentInput = document.getElementById('featured-content-input-'+index)
    const featuredTexts = document.querySelectorAll('.featured-text-preview')
    ids = []
    featuredTexts.forEach(media=> {
        ids.push(parseInt(media.id[media.id.length-1]))
    })
    const index2 = Math.max(...ids)>=1 ? Math.max(...ids)+1 : 1
    // const index2 = document.getElementsByClassName('featured-text').length+1
    const div = document.createElement('div')
    div.id=`featured-text-${index2}`
    div.classList.add("featured-text")
    div.innerHTML = `
    <input class="form-control" type="text" placeholder="Enter Text" oninput="addPreviewFeaturedText(${index2},this.value)">
    <i class="fa-solid fa-x" onclick="removeText(${index2})"></i>
    `
    featuredContentInput.append(div)
    const featuredSection = document.getElementById(`featured-section-preview-${index}`)
    const textDiv = document.createElement('div')
    textDiv.id = `featured-text-preview-${index2}`
    textDiv.classList.add('featured-text-preview')
    featuredSection.append(textDiv)
}

const removeText = index => {
    document.getElementById(`featured-text-${index}`).remove()
    document.getElementById(`featured-text-preview-${index}`).remove()
}

const addPreviewFeaturedText = (index,text) => {
    const previewText = document.getElementById(`featured-text-preview-${index}`)
    previewText.innerText = text
}

let productFile

const addProduct = (index) => {
    const mediaCount = document.getElementById('featured-media-count')
    if (parseInt(mediaCount.value)<10) {
        mediaCount.value = parseInt(mediaCount.value)+1
        
        const featuredContentInput = document.getElementById('featured-content-input-'+index)
        const featuredProducts = document.querySelectorAll('.featured-product')
        ids = []
        featuredProducts.forEach(media=> {
            ids.push(parseInt(media.id[media.id.length-1]))
        })
        const index2 = Math.max(...ids)>=1 ? Math.max(...ids)+1 : 1

        // const index2 = document.getElementsByClassName('featured-product').length+1
        const div = document.createElement('div')
        div.id=`featured-product-${index2}`
        div.classList.add("featured-product")
        div.innerHTML = `
        <form id="featured-product-form-${index2}">
            <div class="d-flex align-items-center">
                <label for="featured-product-input-${index2}" style="background-color:black;" class="media-input p-2 d-flex align-items-center" id="featured-product-media-label-${index2}">
                    <span class="mx-2 img-btn"><i class="fa-solid fa-plus"></i></span>Choose Media
                </label>
                <i class="fa-solid fa-x ms-1" onclick="removeProduct(${index2})"></i>
            </div>
            <input class="form-control" name="title" type="text" placeholder="Product Title">
            <input class="form-control" name="description" type="text" placeholder="Product Description">
            <input class="form-control" name="price" type="text" placeholder="Price">
            <input class="form-control" name="btnLink" type="text" placeholder="Button Link">
            <input class="form-control" name="btnLabel" type="text" placeholder="Button label">
            <button onclick="addPreviewProduct(${index2})" class="btn btn-success my-2 w-75 d-block mx-auto">Add</button>
        </form>
        `
        featuredContentInput.append(div)

        const inputDiv = document.createElement('div')
        inputDiv.id = `featured-product-div-${index2}`
        inputDiv.classList.add('d-none')
        inputDiv.innerHTML = `
        <input class="media-input-preview" name="media-${mediaCount.value}" type="file" accept="image/*" id="featured-product-input-${index2}" placeholder="Choose Media">
        `

        // ADDING INPUT IN ADD FORM
        const addFormBody = document.getElementById('add-card-form-body')
        addFormBody.append(inputDiv)

        const productImage = document.getElementById(`featured-product-input-${index2}`)
        productImage.addEventListener('input',(e)=>{
            productFile = e.target.files[0]
        })
        const featuredSection = document.getElementById(`featured-section-preview-${index}`)
        const productDiv = document.createElement('div')
        productDiv.id = `featured-product-preview-${index2}`
        productDiv.classList.add('featured-product-preview')
        featuredSection.append(productDiv)
    }
}

const addPreviewProduct = (index) => {
    const productForm = document.getElementById(`featured-product-form-${index}`)
    productForm.onsubmit = (e) => {
        e.preventDefault()
        let url
        if(productFile){
            url = URL.createObjectURL(productFile)
        } 
        const title = productForm.querySelector("input[name='title']").value
        const description = productForm.querySelector("input[name='description']").value
        const price = productForm.querySelector("input[name='price']").value
        const btnLink = productForm.querySelector("input[name='btnLink']").value
        const btnLabel = productForm.querySelector("input[name='btnLabel']").value
        const productDiv = document.getElementById(`featured-product-preview-${index}`)
        productDiv.innerHTML = `
        ${url ? `<img src="${url}" class="preview-media">`:""}
        <p class="text">${title}</p>
        <p class="text">${description}</p>
        <p class="text">${price}</p>
        <a class="btn btn-primary" href="${btnLink}">${btnLabel}</a>
        `
        // CHANGING IMAGE INPUT LABEL
        const imageLabel = document.getElementById(`featured-product-media-label-${index}`)
        imageLabel.innerHTML = `<img src=${url} width="60px" height="32px">`
    }
}

const removeProduct = index => {
    document.getElementById(`featured-product-${index}`).remove()
    document.getElementById(`featured-product-preview-${index}`).remove()
    document.getElementById(`featured-product-div-${index}`).remove()
    const count = document.getElementById('featured-media-count')
    count.value = parseInt(count.value)-1
}

// Custom Button

const addButton = index => {
    const featuredContentInput = document.getElementById('featured-content-input-'+index)
    const featuredButtons = document.querySelectorAll('.featured-button-preview')
    ids = []
    featuredButtons.forEach(media=> {
        ids.push(parseInt(media.id[media.id.length-1]))
    })
    const index2 = Math.max(...ids)>=1 ? Math.max(...ids)+1 : 1

    const div = document.createElement('div')
    div.id=`featured-button-${index2}`
    div.classList.add("featured-button")
    div.innerHTML = `
    <form id="featured-button-form-${index2}">
        <input class="form-control" name="btnLink" type="text" placeholder="Button Link">
        <i class="fa-solid fa-x" onclick="removeButton(${index2})"></i>
        <input class="form-control" name="btnLabel" type="text" placeholder="Button Label">
        <button onclick="addPreviewButton(${index2})" class="btn btn-success my-2 w-75 d-block mx-auto">Add</button>
    </form>
    `
    featuredContentInput.append(div)
    const featuredSection = document.getElementById(`featured-section-preview-${index}`)
    const buttonDiv = document.createElement('div')
    buttonDiv.id = `featured-button-preview-${index2}`
    buttonDiv.classList.add('featured-button-preview')
    featuredSection.append(buttonDiv)
}

const addPreviewButton = index => {
    const buttonForm = document.getElementById(`featured-button-form-${index}`)
    buttonForm.onsubmit = (e) => {
        e.preventDefault()
        const btnLink = buttonForm.querySelector("input[name='btnLink']").value
        const btnLabel = buttonForm.querySelector("input[name='btnLabel']").value
        const buttonDiv = document.getElementById(`featured-button-preview-${index}`)
        buttonDiv.innerHTML = `
        <a class="btn btn-primary" href="${btnLink}">${btnLabel}</a>
        `
    }
}

const removeButton = index => {
    document.getElementById(`featured-button-${index}`).remove()
    document.getElementById(`featured-button-preview-${index}`).remove()
}

// ADD CODE
const addEmbedCode = index => {
    const featuredContentInput = document.getElementById('featured-content-input-'+index)
    const featuredCodes = document.querySelectorAll('.featured-content-code')
    ids = []
    featuredCodes.forEach(media=> {
        ids.push(parseInt(media.id[media.id.length-1]))
    })
    const index2 = Math.max(...ids)>=1 ? Math.max(...ids)+1 : 1
    // const index2 = document.getElementsByClassName('featured-code').length+1
    const div = document.createElement('div')
    div.id=`featured-code-${index2}`
    div.classList.add("featured-code")
    div.innerHTML = `
    <input class="form-control" type="text" placeholder="Add Code" oninput="addPreviewCode(${index2},this.value)">
    <i class="fa-solid fa-x" onclick="removeCode(${index2})"></i>
    `
    featuredContentInput.append(div)
    const featuredSection = document.getElementById(`featured-section-preview-${index}`)
    const buttonDiv = document.createElement('div')
    buttonDiv.id = `featured-code-preview-${index2}`
    buttonDiv.classList.add('featured-content-code')
    featuredSection.append(buttonDiv)
}

const addPreviewCode = (index,value) => {
    document.getElementById(`featured-code-preview-${index}`).innerHTML = value
}

const removeCode = index => {
    document.getElementById(`featured-code-${index}`).remove()
    document.getElementById(`featured-code-preview-${index}`).remove()
}

const changeHeaderBg = (value) => {
    document.getElementById('preview-header').style.backgroundColor = value
}

const changeBodyBg = (value) => {
    document.querySelector('.preview').style.backgroundColor = value
    document.getElementById('preview-body').style.backgroundColor = value
}

const changeBtnBg = (value) => {
    const btns = document.querySelectorAll('.preview .btn')
    console.log(btns);
    btns.forEach(btn => {
        btn.style.backgroundColor = `${value}`
    })
}

const changeFcBg = (value) => {
    const fcs = document.querySelectorAll('.preview .featured-section-preview')
    fcs.forEach(fc => {
        fc.style.backgroundColor = value
    })
}

const setHtml = () => {
    const preview = document.getElementById('preview')
    const htmlInput = document.getElementById("card-html-input")
    htmlInput.value = preview.innerHTML

    // SETTING MEDIA INPUTS
    const medias = document.querySelectorAll('.media-input-preview')
    console.log(medias);
    i = 1
    medias.forEach(media => {
        media.setAttribute('name',`media-${i}`)
        i++
    })
}

const setNoUserHtml = () => {
    const preview = document.getElementById('preview')
    const htmlInput = document.getElementById("card-html-input")
    htmlInput.value = preview.innerHTML
}

const submitVcfForm = () => {
    document.getElementById('vcf-form').submit()
}