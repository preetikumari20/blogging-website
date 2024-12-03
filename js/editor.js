const blogTitleField = document.querySelector('.title');
const articleFeild = document.querySelector('.article');
const bannerImage = document.querySelector('#banner-upload');
const banner = document.querySelector(".banner");
let bannerPath;

const publishBtn = document.querySelector('.publish-btn');
const uploadInput = document.querySelector('#image-upload');

bannerImage.addEventListener('change', () => {
    console.log('Banner image input changed');
    uploadImage(bannerImage, "banner");
});

uploadInput.addEventListener('change', () => {
    console.log('Image input changed');
    uploadImage(uploadInput, "image");
});


const uploadImage = (uploadFile, uploadType) => {
    const [file] = uploadFile.files;
    console.log(file);  // Check the file object in the console

    if (file) {
        if (!file.type.includes("image")) {
            alert("Upload Image only");
            return;
        }

        // Optional: Validate file size
        if (file.size > 5 * 1024 * 1024) { // 5MB limit for example
            alert("File is too large. Max size is 5MB.");
            return;
        }

        const formdata = new FormData();
        formdata.append('image', file);

        fetch('/upload', {
            method: 'POST',
            body: formdata
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to upload image');
            }
            return res.json();
        })
        .then(data => {
            console.log('Upload response:', data);
            // Further actions after upload success
        })
        .catch(err => {
            console.error('Upload error:', err);
            alert('There was an error uploading the image. Please try again.');
        });
    } else {
        alert("No file selected.");
    }
};


const addImage = (imagepath, alt) => {
    let curPos = articleFeild.selectionStart;
    let textToInsert = `\r![${alt}](${imagepath})\r`;
    articleFeild.value = articleFeild.value.slice(0, curPos) + textToInsert + articleFeild.value.slice(curPos);
};

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

publishBtn.addEventListener('click', () => {
    if (articleFeild.value.length && blogTitleField.value.length) {
        // generating id
        let letters = 'abcdefghijklmnopqrstuvwxyz';
        let blogTitle = blogTitleField.value.split(" ").join("-");
        let id = '';
        for (let i = 0; i < 4; i++) {
            id += letters[Math.floor(Math.random() * letters.length)];
        }

        // setting up docName
        let docName = `${blogTitle}-${id}`;
        let date = new Date(); // for published at info

        //access firestore with db variable;
        db.collection("blogs").doc(docName).set({
            title: blogTitleField.value,
            article: articleFeild.value,
            bannerImage: bannerPath,
            publishedAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
        })
        .then(() => {
            location.href = `/${docName}`;
        })
        .catch((err) => {
            console.error(err);
        });
    }
});
