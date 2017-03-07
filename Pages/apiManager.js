function ApiManager() {
	this.baseUrl = "http://localhost:51121";

	this.Questionnaires = this.baseUrl + '/api/Questionnaire';
	this.Login = this.baseUrl + '/api/Login';

}