console.log('This is my news website');
//Initialize the news api parameters
let source = 'bbc-news';
let apiKey = '8aa8bb7a02e24282a4cbd720432cb9a5';

//Grab the news container
let accordianId = document.getElementById('accordianId');

//Create an ajax get request
const xhr = new XMLHttpRequest();
xhr.open('GET', `https://newsapi.org/v2/top-headlines?sources=${source}&apikey=${apiKey}`, true);

//Things to do when response is ready
xhr.onload = function () {
    if (this.status === 200) {
           let json =  JSON.parse(this.responseText);
           let articles = json.articles;
           let newsHtml = '';
           articles.forEach(function (element, index) {   
                let news = `
                <div class="card">
                        <div class="card-header" role="tab" id="section${index}HeaderId">
                            <h5 class="mb-0">
                                <a data-toggle="collapse" data-parent="#accordianId" href="#section${index}ContentId" aria-expanded="true" aria-controls="section1ContentId">
                                ${element['title']}
                        </a>
                            </h5>
                        </div>
                        <div id="section${index}ContentId" class="collapse in" role="tabpanel" aria-labelledby="section${index}HeaderId">
                            <div class="card-body">
                                ${element['content']}
                            </div>
                            <div class= "card-footer">
                                <a href="${element['url']}" target="_blank">Read more here .</a>
                            </div>
                        </div>
                </div>
                `;
                newsHtml += news;
            });
            accordianId.innerHTML = newsHtml;
    }else{
        console.log('Some error occured');     
    }
}

xhr.send();
