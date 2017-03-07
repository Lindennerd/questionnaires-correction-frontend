function QuestionListing() {

    this.questionnaires = null;
    this.baseUrl = api.Questionnaires;

    this.actualPage = 1;
    this.limit = 9;
    this.total = 0;

    this.fetchData();

}

QuestionListing.prototype.fetchData = function() {
    $.getJSON(this.baseUrl + '?'+ 'limit='+this.limit+'&offset='+((this.actualPage - 1) * this.limit), function (data) {
        var resp = JSON.parse(data);

        this.questionnaires = resp.Questionnaires;
        this.total = resp.Total;
        
        localStorage.removeItem("questionnaires");
        localStorage.setItem("questionnaires", JSON.stringify(this.questionnaires));


        this.data =
        {
            questions: this.questionnaires,
            filtering: {
                courses: resp.courses
            },
            pagination: {
                currentPage: this.actualPage,
                pageCount: Math.ceil(this.total / this.limit),
                size: this.limit
            }
        };

        this.filtered = false;
        this.render(this.data);

    }.bind(this));
}

QuestionListing.prototype.render = function (data) {
    if (!data) return;

    var pageBuilder = new PageBuilder({
            container: '#main',
            templateUrl: './Pages/QuestionListingPage/QuestionListing.html',
            data: data});
    
    pageBuilder.render(function(){

        $('#doFilter').click(function(ev){
            ev.preventDefault();
            $.getJSON(this.composedUrl + '&course=' + $('#filter-course :selected').val(), function (q) {
                this.data.questions = JSON.parse(q.Questionnaires);
                this.render(this.data);
            }.bind(this))
        }.bind(this));

        $('#cleanFilter').click(function(ev){
            ev.preventDefault();
            $.getJSON(this.composedUrl, function (q) {
                var resp = JSON.parse(q);

                this.data.questions = resp.Questionnaires;
                this.render(this.data);
            }.bind(this))

        }.bind(this));

        $('.pagination a').click(function (event) {
            event.preventDefault();

            this.actualPage = parseInt($(event.target).attr('data-page'));
            this.data.pagination.currentPage = parseInt($(event.target).attr('data-page'));
            this.fetchData();
        }.bind(this));

    }.bind(this))
}

