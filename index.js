var api = new ApiManager();

$(function() {

    var questionnaires = null;

    $(document).ready(function(){
        $(window).trigger('hashchange');    

    });

    $(window).on('hashchange', function(){
		render(decodeURI(window.location.hash));
	});

    function render(url){
        var map = {
            '': function(){
                if(true /* isLogged */){
                    window.location.hash = '#questionarios';
                } else {
                    window.location.hash = '#login';
                }
            },

            '#login': function() {
                var login = new LoginPage();
                login.render();
            },

            '#avaliaquestao': function() {
                var qa = new QuestionAvaluation(url.split('#avaliaquestao/')[1].trim());
                qa.render();
            },

            '#questionarios': function(){
                var ql = new QuestionListing();
                ql.render();
            },

            '#erro': function() {

            }
        }

        var temp = url.split('/')[0];
        if(map[temp]){
            map[temp]();
        } else{
            // error pages
        }
    }
});