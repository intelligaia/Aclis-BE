"use strict";

global.GenericError = function (message) {
    this.name = 'GenericError';
    this.message = message || 'There was some`` kinda GenericError';
    this.code = 500;
};

GenericError.prototype = Object.create(Error.prototype);
GenericError.prototype.constructor = GenericError;

global.MultipleManager = function (message) {
    this.name = 'MultipleManager';
    this.message = message || 'You have added more than on manager against one team';
    this.code = 500;
};

MultipleManager.prototype = Object.create(Error.prototype);
MultipleManager.prototype.constructor = MultipleManager;

global.NotFoundError = function (message) {
    this.name = 'NotFoundError';
    this.message = message || 'The url you are looking for was not found!!';
    this.code = 404;
};

NotFoundError.prototype = Object.create(Error.prototype);
NotFoundError.prototype.constructor = NotFoundError;

global.InvalidPassword = function (message) {
    this.name = 'InvalidPassword';
    this.message = message || 'You have entered a worng password!!';
    this.code = 490;
};

InvalidPassword.prototype = Object.create(Error.prototype);
InvalidPassword.prototype.constructor = InvalidPassword;

global.WrongPassword = function (message) {
    this.name = 'WrongPassword';
    this.message = message || 'You have entered a worng password!!';
    this.code = 420;
};

WrongPassword.prototype = Object.create(Error.prototype);
WrongPassword.prototype.constructor = WrongPassword;

global.AccountNotFound = function (message) {
    this.name = 'AccountNotFound';
    this.message = message || 'This account does not exists in our database';
    this.code = 404;
};

AccountNotFound.prototype = Object.create(Error.prototype);
AccountNotFound.prototype.constructor = AccountNotFound;

global.FileNotFoundError = function (message) {
    this.name = 'FileNotFoundError';
    this.message = message || 'The file you are looking for was not found';
    this.code = 404;
};

FileNotFoundError.prototype = Object.create(Error.prototype);
FileNotFoundError.prototype.constructor = FileNotFoundError;

global.UserNotActiveError = function (message) {
    this.name = 'UserNotActiveError';
    this.message = message || 'The user state is not active. Cannot use account until state is active';
    this.code = 499;
};

UserNotActiveError.prototype = Object.create(Error.prototype);
UserNotActiveError.prototype.constructor = UserNotActiveError;

global.UserExistsErrorEmail = function (message) {
    this.name = 'UserExistsErrorEmail';
    this.message = message || 'A user with the entered email already exists';
    this.code = 475;
};

UserExistsErrorEmail.prototype = Object.create(Error.prototype);
UserExistsErrorEmail.prototype.constructor = UserExistsErrorEmail;

global.NotAuthorised = function (message) {
    this.name = 'NotAuthorised';
    this.message = message || 'You are not authorised to perfor this action';
    this.code = 475;
};

NotAuthorised.prototype = Object.create(Error.prototype);
NotAuthorised.prototype.constructor = NotAuthorised;

global.UserDoesNotExistsErrorEmail = function (message) {
    this.name = 'UserDoesNotExistsErrorEmail';
    this.message = message || 'A user with the entered email does not exists';
    this.code = 475;
};

UserDoesNotExistsErrorEmail.prototype = Object.create(Error.prototype);
UserDoesNotExistsErrorEmail.prototype.constructor = UserDoesNotExistsErrorEmail;

global.UserExistsErrorEmail = function (message) {
    this.name = 'UserExistsErrorEmail';
    this.message = message || 'A user with the entered email already exists';
    this.code = 475;
};

UserExistsErrorEmail.prototype = Object.create(Error.prototype);
UserExistsErrorEmail.prototype.constructor = UserExistsErrorEmail;

global.UserExistsErrorUsername = function (message) {
    this.name = 'UserExistsErrorUsername';
    this.message = message || 'A user with the entered username already exists';
    this.code = 475;
};

UserExistsErrorUsername.prototype = Object.create(Error.prototype);
UserExistsErrorUsername.prototype.constructor = UserExistsErrorUsername;

global.AlreadyDeletedError = function (message) {
    this.name = 'AlreadyDeletedError';
    this.message = message || 'This has already been deleted by someone else';
    this.code = 475;
};

AlreadyDeletedError.prototype = Object.create(Error.prototype);
AlreadyDeletedError.prototype.constructor = AlreadyDeletedError;

global.AlreadyAssignedToSameAgent = function (message) {
    this.name = 'AlreadyAssignedToSameAgent';
    this.message = message || 'This order has already been assigned to this agent';
    this.code = 475;
};

AlreadyAssignedToSameAgent.prototype = Object.create(Error.prototype);
AlreadyAssignedToSameAgent.prototype.constructor = AlreadyAssignedToSameAgent;

global.AlreadyAssignedError = function (message) {
    this.name = 'AlreadyAssignedError';
    this.message = message || 'This has already been already assigned to this agent';
    this.code = 475;
};

AlreadyAssignedError.prototype = Object.create(Error.prototype);
AlreadyAssignedError.prototype.constructor = AlreadyAssignedError;

global.OrderAlreadyAccepted = function (message) {
    this.name = 'OrderAlreadyAccepted';
    this.message = message || 'This order has already been accepted by some other agent';
    this.code = 444;
};

OrderAlreadyAccepted.prototype = Object.create(Error.prototype);
OrderAlreadyAccepted.prototype.constructor = OrderAlreadyAccepted;

global.UserExistsErrorEmployeeCode = function (message) {
    this.name = 'UserExistsErrorEmployeeCode';
    this.message = message || 'A user with the entered employee code already exists';
    this.code = 475;
};

UserExistsErrorEmployeeCode.prototype = Object.create(Error.prototype);
UserExistsErrorEmployeeCode.prototype.constructor = UserExistsErrorEmployeeCode;

global.ValidationError = function (message) {
    this.name = 'ValidationError';
    this.message = `There were errors in validation${message}.`;
    this.code = 420;
};

ValidationError.prototype = Object.create(Error.prototype);
ValidationError.prototype.constructor = ValidationError;

global.AccessTokenError = function (message) {
    this.name = 'AccessTokenError';
    this.message = message || 'Your session has expired. Your account seems to be active on another device. Kindly login again.';
    this.code = 490;
};

AccessTokenError.prototype = Object.create(Error.prototype);
AccessTokenError.prototype.constructor = AccessTokenError;

global.InvalidLoginError = function (message) {
    this.name = 'InvalidLoginError';
    this.message = message || 'Your Email ID or Password was Incorrect';
    this.code = 490;
};

InvalidLoginError.prototype = Object.create(Error.prototype);
InvalidLoginError.prototype.constructor = InvalidLoginError;

global.NotYourDeviceError = function (message) {
    this.name = 'NotYourDeviceError';
    this.message = message || `The device ain't yours bruh!! Be cool!!`;
    this.code = 492;
};

NotYourDeviceError.prototype = Object.create(Error.prototype);
NotYourDeviceError.prototype.constructor = NotYourDeviceError;

global.NoPhoneNumberError = function (message) {
    this.name = 'NoPhoneNumberError';
    this.message = message || 'No Phone numbers in your account... Say What!!';
    this.code = 490;
};

NoPhoneNumberError.prototype = Object.create(Error.prototype);
NoPhoneNumberError.prototype.constructor = NoPhoneNumberError;

global.InvalidContentTypeError = function (message) {
    this.name = 'InvalidContentTypeError';
    this.message = message || 'The content type set was invalid';
    this.code = 406;
};

InvalidContentTypeError.prototype = Object.create(Error.prototype);
InvalidContentTypeError.prototype.constructor = InvalidContentTypeError;

global.PhoneNumbersCountFullError = function (message) {
    this.name = 'PhoneNumbersCountFullError';
    this.message = message || 'You have added the maximum number of phone numbers possible';
    this.code = 457;
};

PhoneNumbersCountFullError.prototype = Object.create(Error.prototype);
PhoneNumbersCountFullError.prototype.constructor = PhoneNumbersCountFullError;

global.InvalidVerificationPinError = function (message) {
    this.name = 'InvalidVerificationPinError';
    this.message = message || 'The pin you have entered is invalid';
    this.code = 422;
};

InvalidVerificationPinError.prototype = Object.create(Error.prototype);
InvalidVerificationPinError.prototype.constructor = InvalidVerificationPinError;

global.ExpiredVerificationPinError = function (message) {
    this.name = 'ExpiredVerificationPinError';
    this.message = message || 'The pin you have entered has probably expired';
    this.code = 423;
};

ExpiredVerificationPinError.prototype = Object.create(Error.prototype);
ExpiredVerificationPinError.prototype.constructor = ExpiredVerificationPinError;

global.InvalidPhoneNumberError = function (message) {
    this.name = 'InvalidPhoneNumberError';
    this.message = message || 'The phone number entered is Invalid';
    this.code = 451;
};

InvalidPhoneNumberError.prototype = Object.create(Error.prototype);
InvalidPhoneNumberError.prototype.constructor = InvalidPhoneNumberError;

global.PhoneNumberNotLinkedToUserError = function (message) {
    this.name = 'PhoneNumberNotLinkedToUserError';
    this.message = message || 'The phone number you are trying to access does not belong to you';
    this.code = 468;
};

global.PhoneNumberNotGreaterThanOneError = function (message) {
    this.name = 'PhoneNumberNotGreaterThanOneError';
    this.message = message || 'You do not have more than one phone number';
    this.code = 469;
};

PhoneNumberNotGreaterThanOneError.prototype = Object.create(Error.prototype);
PhoneNumberNotGreaterThanOneError.prototype.constructor = PhoneNumberNotGreaterThanOneError;

global.BusinessEmailAlreadyExists = function (message) {
    this.name = 'BusinessEmailAlreadyExists';
    this.message = message || 'This Buisness Email already exists. Please use another';
    this.code = 474;
};

BusinessEmailAlreadyExists.prototype = Object.create(Error.prototype);
BusinessEmailAlreadyExists.prototype.constructor = BusinessEmailAlreadyExists;

global.ServiceRegionAlreadyExists = function (message) {
    this.name = 'ServiceRegionAlreadyExists';
    this.message = message || 'This Service Region already exists. Please use another';
    this.code = 474;
};

ServiceRegionAlreadyExists.prototype = Object.create(Error.prototype);
ServiceRegionAlreadyExists.prototype.constructor = ServiceRegionAlreadyExists;

global.TaskTypeAlreadyExists = function (message) {
    this.name = 'TaskTypeAlreadyExists';
    this.message = message || 'This Task Type Name already exists. Please use another';
    this.code = 474;
};

TaskTypeAlreadyExists.prototype = Object.create(Error.prototype);
TaskTypeAlreadyExists.prototype.constructor = TaskTypeAlreadyExists;

global.TemplateAlreadyExists = function (message) {
    this.name = 'TemplateAlreadyExists';
    this.message = message || 'This Template Name already exists. Please use another';
    this.code = 474;
};

TemplateAlreadyExists.prototype = Object.create(Error.prototype);
TemplateAlreadyExists.prototype.constructor = TemplateAlreadyExists;

global.TeamNameAlreadyExists = function (message) {
    this.name = 'TeamNameAlreadyExists';
    this.message = message || 'This Team Name already exists. Please use another';
    this.code = 474;
};

TeamNameAlreadyExists.prototype = Object.create(Error.prototype);
TeamNameAlreadyExists.prototype.constructor = TeamNameAlreadyExists;


global.TeamInitialsAlreadyExists = function (message) {
    this.name = 'TeamInitialsAlreadyExists';
    this.message = message || 'This Team Initaials already exists. Please use another';
    this.code = 474;
};

TeamInitialsAlreadyExists.prototype = Object.create(Error.prototype);
TeamInitialsAlreadyExists.prototype.constructor = TeamInitialsAlreadyExists;


global.SyncTimestampError = function (message) {
    this.name = 'SyncTimestampError';
    this.message = message || 'The timestamps do not match. Start over with store and sync';
    this.code = 445;
};

SyncTimestampError.prototype = Object.create(Error.prototype);
SyncTimestampError.prototype.constructor = SyncTimestampError;

global.DeviceNotActivatedError = function (message) {
    this.name = 'DeviceNotActivatedError';
    this.message = message || 'The device has not been activated through email yet!!';
    this.code = 495;
};

DeviceNotActivatedError.prototype = Object.create(Error.prototype);
DeviceNotActivatedError.prototype.constructor = DeviceNotActivatedError;

global.TransactionFailureError = function (message) {
    this.name = 'TransactionFailureError';
    this.message = message || 'The transaction has failed';
    this.code = 434;
};

TransactionFailureError.prototype = Object.create(Error.prototype);
TransactionFailureError.prototype.constructor = TransactionFailureError;
