function QuestionAvaluation(id) {
    this.questionnaires = JSON.parse(localStorage.getItem("questionnaires"));
    this.id = id;
    this.questionnaire = null;
    this.evaluatingQuestion = null;

    this.findQuestionnaire = function (id, callback) {
        var questionnaire = $(this.questionnaires).filter(function (index, q) {
            if (q.id == id) return q;
        });
        this.questionnaire = questionnaire[0];
        if (callback) callback(questionnaire[0]);
    }.bind(this)

}

QuestionAvaluation.prototype.render = function () {
    this.findQuestionnaire(this.id, function (q) {
        var pageBuilder = new PageBuilder({
            container: '#main',
            templateUrl: './Pages/QuestionAvaluationPage/QuestionAvaluation.html',
            data: {
                questionnaire: q,
                questionsToSolve: groupBy(q.Questoes, 'corrigido')["0"].length
            }
        });

        pageBuilder.render(function () {

            $('#avaluate-question').click( function() {this.avaluateQuestion() }.bind(this));
            $('#close-questionnaire').click(closeQuestionnaire);
            $('#choose-question').click(function () { this.chooseQuestion($('#question-number').val()) }.bind(this));

        }.bind(this));
    }.bind(this))
}

QuestionAvaluation.prototype.chooseQuestion = function (questionNumber) {
    var question = this.questionnaire.Questoes.filter(function (q) {
        return q.ordem == questionNumber;
    });

    if (question.length > 0) {
        this.evaluatingQuestion = question[0];
        $('#question-number').val(questionNumber);

        $.get('./Pages/QuestionAvaluationPage/QuestionInfo.html', function (questionTemplate) {
            var hbTemplate = Handlebars.compile(questionTemplate);
            var compiled = hbTemplate(question[0]);

            $('#question-information').children().remove();
            $('#question-information').html(compiled);

            $('#nota-slide').on('input change', function (event) {
                $('#nota-text').val($(event.target).val());
            });
        })
    } else {
        alert('erro');
    }
}

QuestionAvaluation.prototype.avaluateQuestion = function () {
    // send to server *** TODO ***

    if(this.evaluatingQuestion == null) {
        alert('Questionário Finalizado');            
    }    

    for (var i = 0; i < this.questionnaire.questions.length; i++) {
        if (this.questionnaire.questions[i].id == this.evaluatingQuestion.id) {
            this.questionnaire.questions[i].corrigido = 1;
            this.evaluatingQuestion = null;
        }
    }

    for (var i = 0; i < this.questionnaire.questions.length; i++) {
        if(this.questionnaire.questions[i].corrigido != 1) {
            this.chooseQuestion(this.questionnaire.questions[i].ordem);
            this.evaluatingQuestion = this.questionnaire.questions[i];
            break;
        }
    }

    if(this.evaluatingQuestion == null) {
        $('#question-information').children().remove();
        $('#question-number').val('');
        
        alert('Questionário Finalizado');
    }

}

function closeQuestionnaire() {

}