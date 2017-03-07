function LoginPage () {

}

LoginPage.prototype.render = function() {
    var pageBuilder = new PageBuilder({container: '#main', templateUrl: './Pages/LoginPage/login.html'});
    pageBuilder.render(function() {

    	$('#login-page form').attr('action', api.Login);


    }.bind(this));
}