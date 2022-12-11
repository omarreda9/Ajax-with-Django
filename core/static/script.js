const alertBox = document.getElementById("alert-box");
const imgBox = document.getElementById("img-box");
const formBox = document.querySelector(".form-box");

const image = document.getElementById("id_image");
const title = document.getElementById("id_title");
const content = document.getElementById("id_content");
const csrf = document.getElementsByName("csrfmiddlewaretoken");

const url = '';

// console.log(csrf);
const alertFunction = (alertColor, text) => {
    alertBox.innerHTML = `
    <div class="alert alert-${alertColor}" role="alert">
        ${text}
    </div>`
}

image.addEventListener('change', () => {
    const imageData = image.files[0]
    // we write image.files -> image only is input field 
    // we access on files in input image by image.files
    const url = URL.createObjectURL(imageData)
    imgBox.innerHTML = `<img src="${url}" width="100%">`
});

formBox.addEventListener('submit', e => {
    e.preventDefault();
    // e.preventDefault() -> will not reload

    const form = new FormData()
    form.append('csrfmiddlewaretoken', csrf[0].value);
    form.append('image', image.files[0]);
    form.append('title', title.value);
    form.append('content', content.value)
    // console.log(form)
    // for (const [key, value] of form) {
    //     console.log(key);
    //     console.log(value);
    // };
    console.log(url);
    console.log('omar');

    $.ajax({
        type: 'POST',
        url: url,
        enctype: 'multipart/form-data',
        data: form,
        success: function (response) {
            // console.log(response)
            const textSuccess = `${response.title} Posted successfully`
            alertFunction('success', textSuccess)
            setTimeout(() => {
                alertBox.innerHTML = '';
                imgBox.innerHTML = '';
                image.value = '';
                title.value = '';
                content.value = '';
                // formBox.innerHTML = '';
            }, 2000)
        },
        error: function (error) {
            // console.log(error)
            alertFunction('danger', 'Opp... data invalid')
        },
        cache: false,
        contentType: false,
        processData: false,
    })
})