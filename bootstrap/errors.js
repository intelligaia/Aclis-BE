'use strict';

// Generic Error
global.GenericError = function (message) {
    this.name = 'GenericError';
    this.message = message || 'There was some kind of GenericError';
    this.code = 500;
};
GenericError.prototype = Object.create(Error.prototype);
GenericError.prototype.constructor = GenericError;

// MultipleManager Error
global.MultipleManager = function (message) {
    this.name = 'MultipleManager';
    this.message = message || 'You have added more than one manager against one team';
    this.code = 500;
};
MultipleManager.prototype = Object.create(Error.prototype);
MultipleManager.prototype.constructor = MultipleManager;

// NotFoundError
global.NotFoundError = function (message) {
    this.name = 'NotFoundError';
    this.message = message || 'The URL you are looking for was not found!';
    this.code = 404;
};
NotFoundError.prototype = Object.create(Error.prototype);
NotFoundError.prototype.constructor = NotFoundError;

// InvalidPassword Error
global.InvalidPassword = function (message) {
    this.name = 'InvalidPassword';
    this.message = message || 'You have entered a wrong password!';
    this.code = 490;
};
InvalidPassword.prototype = Object.create(Error.prototype);
InvalidPassword.prototype.constructor = InvalidPassword;

// WrongPassword Error
global.WrongPassword = function (message) {
    this.name = 'WrongPassword';
    this.message = message || 'You have entered a wrong password!';
    this.code = 420;
};
WrongPassword.prototype = Object.create(Error.prototype);
WrongPassword.prototype.constructor = WrongPassword;

// AccountNotFound Error
global.AccountNotFound = function (message) {
    this.name = 'AccountNotFound';
    this.message = message || 'This account does not exist in our database';
    this.code = 404;
};
AccountNotFound.prototype = Object.create(Error.prototype);
AccountNotFound.prototype.constructor = AccountNotFound;

// FileNotFoundError
global.FileNotFoundError = function (message) {
    this.name = 'FileNotFoundError';
    this.message = message || 'The file you are looking for was not found';
    this.code = 404;
};
FileNotFoundError.prototype = Object.create(Error.prototype);
FileNotFoundError.prototype.constructor = FileNotFoundError;

// UserNotActiveError
global.UserNotActiveError = function (message) {
    this.name = 'UserNotActiveError';
    this.message = message || 'The user state is not active. Cannot use account until state is active';
    this.code = 499;
};
UserNotActiveError.prototype = Object.create(Error.prototype);
UserNotActiveError.prototype.constructor = UserNotActiveError;

// UserExistsErrorEmail
global.UserExistsErrorEmail = function (message) {
    this.name = 'UserExistsErrorEmail';
    this.message = message || 'A user with the entered email already exists';
    this.code = 475;
};
UserExistsErrorEmail.prototype = Object.create(Error.prototype);
UserExistsErrorEmail.prototype.constructor = UserExistsErrorEmail;

// UserExistsErrorUsername
global.UserExistsErrorUsername = function (message) {
    this.name = 'UserExistsErrorUsername';
    this.message = message || 'A user with the entered username already exists';
    this.code = 475;
};
UserExistsErrorUsername.prototype = Object.create(Error.prototype);
UserExistsErrorUsername.prototype.constructor = UserExistsErrorUsername;

// AlreadyDeletedError
global.AlreadyDeletedError = function (message) {
    this.name = 'AlreadyDeletedError';
    this.message = message || 'This has already been deleted by someone else';
    this.code = 475;
};
AlreadyDeletedError.prototype = Object.create(Error.prototype);
AlreadyDeletedError.prototype.constructor = AlreadyDeletedError;

// AlreadyAssignedError
global.AlreadyAssignedError = function (message) {
    this.name = 'AlreadyAssignedError';
    this.message = message || 'This has already been assigned to this agent';
    this.code = 475;
};
AlreadyAssignedError.prototype = Object.create(Error.prototype);
AlreadyAssignedError.prototype.constructor = AlreadyAssignedError;

// OrderAlreadyAccepted
global.OrderAlreadyAccepted = function (message) {
    this.name = 'OrderAlreadyAccepted';
    this.message = message || 'This order has already been accepted by some other agent';
    this.code = 444;
};
OrderAlreadyAccepted.prototype = Object.create(Error.prototype);
OrderAlreadyAccepted.prototype.constructor = OrderAlreadyAccepted;

// ValidationError
global.ValidationError = function (message) {
    this.name = 'ValidationError';
    this.message = `There were errors in validation: ${message}.`;
    this.code = 420;
};
ValidationError.prototype = Object.create(Error.prototype);
ValidationError.prototype.constructor = ValidationError;

// Other Errors
global.NotAuthorised = function (message) {
    this.name = 'NotAuthorised';
    this.message = message || 'You are not authorised to perform this action';
    this.code = 475;
};
NotAuthorised.prototype = Object.create(Error.prototype);
NotAuthorised.prototype.constructor = NotAuthorised;

// Add additional error definitions as needed...
