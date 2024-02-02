export const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Swafe API',
            version: '1.0.0',
            description: 'API documentation for the Swafe application',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Local server',
            },
        ],
        paths: {
            "/users/create": {
                "post": {
                    "tags": [
                        "users"
                    ],
                    "summary": "Permet de créer un nouvel utilisateur",
                    "requestBody": {
                        "required": true,
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "email": {
                                            "type": "string"
                                        },
                                        "password": {
                                            "type": "string"
                                        },
                                        "firstName": {
                                            "type": "string"
                                        },
                                        "lastName": {
                                            "type": "string"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "responses": {
                        "200": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "status": {
                                                "type": "string"
                                            },
                                            "message": {
                                                "type": "string"
                                            },
                                            "data": {
                                                "type": "object",
                                                "properties": {
                                                    "user": {
                                                        "type": "object",
                                                        "properties": {
                                                            "uid": {
                                                                "type": "string"
                                                            },
                                                            "email": {
                                                                "type": "string"
                                                            },
                                                            "firstName": {
                                                                "type": "string"
                                                            },
                                                            "lastName": {
                                                                "type": "string"
                                                            },
                                                            "emailVerified": {
                                                                "type": "boolean"
                                                            },
                                                            "phoneVerified": {
                                                                "type": "boolean"
                                                            },
                                                        },
                                                        "role": {
                                                            "type": "string"
                                                        },
                                                        "selfieStatus": {
                                                            "type": "string"
                                                        },
                                                    }
                                                }
                                            },
                                            "token": {
                                                "type": "string"
                                            }
                                        },
                                    }
                                }
                            }
                        },
                        "400": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "status": {
                                                "type": "string"
                                            },
                                            "message": {
                                                "type": "string"
                                            },
                                            "errors": {
                                                "type": "array",
                                                "items": {
                                                    "message": {
                                                        "type": "string",
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "500": {
                            "description": "Internal server error"
                        }
                    }
                }
            },
            "/users/login": {
                "post": {
                    "tags": [
                        "users"
                    ],
                    "security": [{"BearerAuth": []}],
                    "summary": "Permet à un utilisateur de se connecter",
                    "requestBody": {
                        "required": true,
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "email": {
                                            "type": "string"
                                        },
                                        "password": {
                                            "type": "string"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "responses": {
                        "200": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "status": {
                                                "type": "string"
                                            },
                                            "message": {
                                                "type": "string"
                                            },
                                            "data": {
                                                "type": "object",
                                                "properties": {
                                                    "user": {
                                                        "type": "object",
                                                        "properties": {
                                                            "uid": {
                                                                "type": "string"
                                                            },
                                                            "email": {
                                                                "type": "string"
                                                            },
                                                            "firstName": {
                                                                "type": "string"
                                                            },
                                                            "lastName": {
                                                                "type": "string"
                                                            },
                                                            "emailVerified": {
                                                                "type": "boolean"
                                                            },
                                                            "phoneVerified": {
                                                                "type": "boolean"
                                                            },
                                                        },
                                                        "role": {
                                                            "type": "string"
                                                        },
                                                        "selfieStatus": {
                                                            "type": "string"
                                                        },
                                                    }
                                                }
                                            },
                                            "token": {
                                                "type": "string"
                                            }
                                        },
                                    }
                                }
                            }
                        },
                        "400": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "status": {
                                                "type": "string"
                                            },
                                            "message": {
                                                "type": "string"
                                            },
                                            "errors": {
                                                "type": "array",
                                                "items": {
                                                    "message": {
                                                        "type": "string",
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "401": {
                            "description": "Unauthorized"
                        }
                    }
                }
            },
            "/users/one": {
                "get": {
                    "tags": [
                        "users"
                    ],
                    "security": [{"BearerAuth": []}],
                    "summary": "Permet de récupérer les informations de l'utilisateur connecté",
                    "responses": {
                        "200": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "status": {
                                                "type": "string"
                                            },
                                            "message": {
                                                "type": "string"
                                            },
                                            "data": {
                                                "properties": {
                                                    "user": {
                                                        "type": "object",
                                                        "properties": {
                                                            "uid": {
                                                                "type": "string"
                                                            },
                                                            "email": {
                                                                "type": "string"
                                                            },
                                                            "firstName": {
                                                                "type": "string"
                                                            },
                                                            "lastName": {
                                                                "type": "string"
                                                            },
                                                            "emailVerified": {
                                                                "type": "boolean"
                                                            },
                                                            "phoneVerified": {
                                                                "type": "boolean"
                                                            },
                                                        },
                                                        "role": {
                                                            "type": "string"
                                                        },
                                                        "selfieStatus": {
                                                            "type": "string"
                                                        },
                                                    }
                                                }
                                            },
                                            "token": {
                                                "type": "string"
                                            }
                                        },
                                    }
                                }
                            }
                        },
                        "400": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "status": {
                                                "type": "string"
                                            },
                                            "message": {
                                                "type": "string"
                                            },
                                            "errors": {
                                                "type": "array",
                                                "items": {
                                                    "message": {
                                                        "type": "string",
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "500": {
                            "description": "Internal server error"
                        }
                    }
                }
            },
            "/users/update": {
                "put": {
                    "tags": [
                        "users"
                    ],
                    "security": [{"BearerAuth": []}],
                    "summary": "Permet de mettre à jour les données de l'utilisateur connecté",
                    "requestBody": {
                        "required": true,
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "email": {
                                            "type": "string"
                                        },
                                        "firstName": {
                                            "type": "string"
                                        },
                                        "lastName": {
                                            "type": "string"
                                        },
                                        "phoneCountryCode": {
                                            "type": "string"
                                        },
                                        "phoneNumber": {
                                            "type": "string"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "responses": {
                        "200": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "status": {
                                                "type": "string"
                                            },
                                            "message": {
                                                "type": "string"
                                            },
                                            "data": {
                                                "type": "object",
                                                "properties": {
                                                    "user": {
                                                        "type": "object",
                                                        "properties": {
                                                            "uid": {
                                                                "type": "string"
                                                            },
                                                            "email": {
                                                                "type": "string"
                                                            },
                                                            "firstName": {
                                                                "type": "string"
                                                            },
                                                            "lastName": {
                                                                "type": "string"
                                                            },
                                                            "emailVerified": {
                                                                "type": "boolean"
                                                            },
                                                            "phoneVerified": {
                                                                "type": "boolean"
                                                            },
                                                        },
                                                        "role": {
                                                            "type": "string"
                                                        },
                                                        "selfieStatus": {
                                                            "type": "string"
                                                        },
                                                    }
                                                }
                                            },
                                            "token": {
                                                "type": "string"
                                            }
                                        },
                                    }
                                }
                            }
                        },
                        "400": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "status": {
                                                "type": "string"
                                            },
                                            "message": {
                                                "type": "string"
                                            },
                                            "errors": {
                                                "type": "array",
                                                "items": {
                                                    "message": {
                                                        "type": "string",
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "500": {
                            "description": "Internal server error"
                        }
                    }
                }
            },
            "/users/updatePassword": {
                "put": {
                    "tags": [
                        "users"
                    ],
                    "security": [{"BearerAuth": []}],
                    "summary": "Permet de mettre à jour le mot de passe de l'utilisateur connecté",
                    "requestBody": {
                        "required": true,
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "password": {
                                            "type": "string"
                                        },
                                        "newPassword": {
                                            "type": "string"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "responses": {
                        "200": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "status": {
                                                "type": "string"
                                            },
                                            "message": {
                                                "type": "string"
                                            },
                                            "data": {
                                                "type": "object",
                                                "properties": {
                                                    "user": {
                                                        "type": "object",
                                                        "properties": {
                                                            "uid": {
                                                                "type": "string"
                                                            },
                                                            "email": {
                                                                "type": "string"
                                                            },
                                                            "firstName": {
                                                                "type": "string"
                                                            },
                                                            "lastName": {
                                                                "type": "string"
                                                            },
                                                            "emailVerified": {
                                                                "type": "boolean"
                                                            },
                                                            "phoneVerified": {
                                                                "type": "boolean"
                                                            },
                                                        },
                                                        "role": {
                                                            "type": "string"
                                                        },
                                                        "selfieStatus": {
                                                            "type": "string"
                                                        },
                                                    }
                                                }
                                            },
                                        },
                                    }
                                }
                            }
                        },
                        "400": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "status": {
                                                "type": "string"
                                            },
                                            "message": {
                                                "type": "string"
                                            },
                                            "errors": {
                                                "type": "array",
                                                "items": {
                                                    "message": {
                                                        "type": "string",
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "500": {
                            "description": "Internal server error"
                        }
                    }
                }
            },
            "/users/verifyEmail/{token}": {
                "get": {
                    "tags": [
                        "users"
                    ],
                    "parameters": [
                        {
                            "name": "token",
                            "in": "path",
                            "description": "Token pour la vérification de l'email",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        }
                    ],
                    "summary": "Permet de vérifier l'email envoyé à l'utilisateur",
                    "responses": {
                        "200": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "status": {
                                                "type": "string"
                                            },
                                            "message": {
                                                "type": "string"
                                            },
                                            "data": {
                                                "type": "object",
                                                "properties": {
                                                    "user": {
                                                        "type": "object",
                                                        "properties": {
                                                            "uid": {
                                                                "type": "string"
                                                            },
                                                            "email": {
                                                                "type": "string"
                                                            },
                                                            "firstName": {
                                                                "type": "string"
                                                            },
                                                            "lastName": {
                                                                "type": "string"
                                                            },
                                                            "emailVerified": {
                                                                "type": "boolean"
                                                            },
                                                            "phoneVerified": {
                                                                "type": "boolean"
                                                            },
                                                        },
                                                        "role": {
                                                            "type": "string"
                                                        },
                                                        "selfieStatus": {
                                                            "type": "string"
                                                        },
                                                    }
                                                }
                                            },
                                        },
                                    }
                                }
                            }
                        },
                        "400": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "status": {
                                                "type": "string"
                                            },
                                            "message": {
                                                "type": "string"
                                            },
                                            "errors": {
                                                "type": "array",
                                                "items": {
                                                    "message": {
                                                        "type": "string",
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "500": {
                            "description": "Internal server error"
                        }
                    }
                }
            },
            "/users/upload-selfie": {
                "post": {
                    "tags": [
                        "users"
                    ],
                    "security": [{"BearerAuth": []}],
                    "summary": "Permet d'uploader un selfie pour l'utilisateur connecté",
                    "requestBody": {
                        "required": true,
                        "content": {
                            "multipart/form-data": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "file": {
                                            "type": "file",
                                            "format": "binary"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "responses": {
                        "200": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "status": {
                                                "type": "string"
                                            },
                                            "message": {
                                                "type": "string"
                                            },
                                            "data": {
                                                "type": "object",
                                                "properties": {
                                                    "fileName": {
                                                        "type": "string",
                                                    }
                                                }
                                            },
                                        },
                                    }
                                }
                            }
                        },
                        "400": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "status": {
                                                "type": "string"
                                            },
                                            "message": {
                                                "type": "string"
                                            },
                                            "errors": {
                                                "type": "array",
                                                "items": {
                                                    "message": {
                                                        "type": "string",
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "500": {
                            "description": "Internal server error"
                        }
                    }
                }
            },
            "/users/delete": {
                "delete": {
                    "tags": [
                        "users"
                    ],
                    "security": [{"BearerAuth": []}],
                    "summary": "Permet de supprimer l'utilisateur connecté",
                    "responses": {
                        "200": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "status": {
                                                "type": "string"
                                            },
                                            "message": {
                                                "type": "string"
                                            },
                                            "data": {
                                                "type": "object",
                                                "properties": {
                                                    "user": {
                                                        "type": "object",
                                                        "properties": {
                                                            "uid": {
                                                                "type": "string"
                                                            },
                                                            "email": {
                                                                "type": "string"
                                                            },
                                                            "firstName": {
                                                                "type": "string"
                                                            },
                                                            "lastName": {
                                                                "type": "string"
                                                            },
                                                            "emailVerified": {
                                                                "type": "boolean"
                                                            },
                                                            "phoneVerified": {
                                                                "type": "boolean"
                                                            },
                                                        },
                                                        "role": {
                                                            "type": "string"
                                                        },
                                                        "selfieStatus": {
                                                            "type": "string"
                                                        },
                                                    }
                                                }
                                            },
                                        },
                                    }
                                }
                            }
                        },
                        "400": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "status": {
                                                "type": "string"
                                            },
                                            "message": {
                                                "type": "string"
                                            },
                                            "errors": {
                                                "type": "array",
                                                "items": {
                                                    "message": {
                                                        "type": "string",
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "500": {
                            "description": "Internal server error"
                        }
                    }
                }
            },
            "/admins/create": {
                "post": {
                    "tags": [
                        "admins"
                    ],
                    "security": [{"BearerAuth": []}],
                    "summary": "Permet de créer un administrateur",
                    "requestBody": {
                        "required": true,
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "email": {
                                            "type": "string"
                                        },
                                        "password": {
                                            "type": "string"
                                        },
                                        "firstName": {
                                            "type": "string"
                                        },
                                        "lastName": {
                                            "type": "string"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "responses": {
                        "200": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "status": {
                                                "type": "string"
                                            },
                                            "message": {
                                                "type": "string"
                                            },
                                            "data": {
                                                "type": "object",
                                                "properties": {
                                                    "user": {
                                                        "type": "object",
                                                        "properties": {
                                                            "uid": {
                                                                "type": "string"
                                                            },
                                                            "email": {
                                                                "type": "string"
                                                            },
                                                            "firstName": {
                                                                "type": "string"
                                                            },
                                                            "lastName": {
                                                                "type": "string"
                                                            },
                                                            "emailVerified": {
                                                                "type": "boolean"
                                                            },
                                                            "phoneVerified": {
                                                                "type": "boolean"
                                                            },
                                                        },
                                                        "role": {
                                                            "type": "string"
                                                        },
                                                        "selfieStatus": {
                                                            "type": "string"
                                                        },
                                                    }
                                                }
                                            },
                                            "token": {
                                                "type": "string"
                                            }
                                        },
                                    }
                                }
                            }
                        },
                        "400": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "status": {
                                                "type": "string"
                                            },
                                            "message": {
                                                "type": "string"
                                            },
                                            "errors": {
                                                "type": "array",
                                                "items": {
                                                    "message": {
                                                        "type": "string",
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "500": {
                            "description": "Error while creating admin"
                        }
                    }
                }
            },
            "/admins/userList": {
                "get": {
                    "tags": [
                        "admins"
                    ],
                    "security": [{"BearerAuth": []}],
                    "summary": "Permet de récupérer la liste des utilisateurs",
                    "responses": {
                        "200": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "status": {
                                                "type": "string"
                                            },
                                            "message": {
                                                "type": "string"
                                            },
                                            "data": {
                                                "type": "array",
                                                "items": {
                                                    "type": "object",
                                                    "properties": {
                                                        "uid": {
                                                            "type": "string"
                                                        },
                                                        "email": {
                                                            "type": "string"
                                                        },
                                                        "firstName": {
                                                            "type": "string"
                                                        },
                                                        "lastName": {
                                                            "type": "string"
                                                        },
                                                        "phoneCountryCode": {
                                                            "type": "string"
                                                        },
                                                        "phoneNumber": {
                                                            "type": "string"
                                                        },
                                                        "emailVerified": {
                                                            "type": "boolean"
                                                        },
                                                        "phoneVerified": {
                                                            "type": "boolean"
                                                        },
                                                        "role": {
                                                            "type": "string"
                                                        },
                                                        "verificationToken": {
                                                            "type": "string"
                                                        },
                                                        "selfie": {
                                                            "type": "string"
                                                        },
                                                        "selfieStatus": {
                                                            "type": "string"
                                                        },
                                                        "createdAt": {
                                                            "type": "time",
                                                            "format": "date-time"
                                                        },
                                                        "updatedAt": {
                                                            "type": "time",
                                                            "format": "date-time"
                                                        }
                                                    },
                                                }
                                            },
                                        },
                                    }
                                }
                            }
                        },
                        "400": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "status": {
                                                "type": "string"
                                            },
                                            "message": {
                                                "type": "string"
                                            },
                                            "errors": {
                                                "type": "array",
                                                "items": {
                                                    "message": {
                                                        "type": "string",
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "500": {
                            "description": "Internal server error"
                        }
                    }
                }
            },
            "/admins/adminList": {
                "get": {
                    "tags": [
                        "admins"
                    ],
                    "security": [{"BearerAuth": []}],
                    "summary": "Permet de récupérer la liste des administrateurs",
                    "responses": {
                        "200": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "status": {
                                                "type": "string"
                                            },
                                            "message": {
                                                "type": "string"
                                            },
                                            "data": {
                                                "type": "array",
                                                "items": {
                                                    "type": "object",
                                                    "properties": {
                                                        "uid": {
                                                            "type": "string"
                                                        },
                                                        "email": {
                                                            "type": "string"
                                                        },
                                                        "firstName": {
                                                            "type": "string"
                                                        },
                                                        "lastName": {
                                                            "type": "string"
                                                        },
                                                        "phoneCountryCode": {
                                                            "type": "string"
                                                        },
                                                        "phoneNumber": {
                                                            "type": "string"
                                                        },
                                                        "emailVerified": {
                                                            "type": "boolean"
                                                        },
                                                        "phoneVerified": {
                                                            "type": "boolean"
                                                        },
                                                        "role": {
                                                            "type": "string"
                                                        },
                                                        "verificationToken": {
                                                            "type": "string"
                                                        },
                                                        "selfie": {
                                                            "type": "string"
                                                        },
                                                        "selfieStatus": {
                                                            "type": "string"
                                                        },
                                                        "createdAt": {
                                                            "type": "time",
                                                            "format": "date-time"
                                                        },
                                                        "updatedAt": {
                                                            "type": "time",
                                                            "format": "date-time"
                                                        }
                                                    },
                                                }
                                            },
                                        },
                                    }
                                }
                            }
                        },
                        "400": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "status": {
                                                "type": "string"
                                            },
                                            "message": {
                                                "type": "string"
                                            },
                                            "errors": {
                                                "type": "array",
                                                "items": {
                                                    "message": {
                                                        "type": "string",
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "500": {
                            "description": "Error while getting admins"
                        }
                    }
                }
            },
            "/admins/updateUser": {
                "put": {
                    "tags": [
                        "admins"
                    ],
                    "security": [{"BearerAuth": []}],
                    "summary": "Permet de modifier le statut du selfie d'un utilisateur",
                    "requestBody": {
                        "required": true,
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "uid": {
                                            "type": "string"
                                        },
                                        "selfieStatus": {
                                            "type": "string"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "responses": {
                        "200": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "status": {
                                                "type": "string"
                                            },
                                            "message": {
                                                "type": "string"
                                            },
                                            "data": {
                                                "type": "object",
                                                "properties": {
                                                    "uid": {
                                                        "type": "string"
                                                    },
                                                    "email": {
                                                        "type": "string"
                                                    },
                                                    "firstName": {
                                                        "type": "string"
                                                    },
                                                    "lastName": {
                                                        "type": "string"
                                                    },
                                                    "phoneCountryCode": {
                                                        "type": "string"
                                                    },
                                                    "phoneNumber": {
                                                        "type": "string"
                                                    },
                                                    "emailVerified": {
                                                        "type": "boolean"
                                                    },
                                                    "phoneVerified": {
                                                        "type": "boolean"
                                                    },
                                                    "role": {
                                                        "type": "string"
                                                    },
                                                    "verificationToken": {
                                                        "type": "string"
                                                    },
                                                    "selfie": {
                                                        "type": "string"
                                                    },
                                                    "selfieStatus": {
                                                        "type": "string"
                                                    },
                                                    "createdAt": {
                                                        "type": "time",
                                                        "format": "date-time"
                                                    },
                                                    "updatedAt": {
                                                        "type": "time",
                                                        "format": "date-time"
                                                    }
                                                },
                                            },
                                        },
                                    }
                                }
                            }
                        },
                        "400": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "status": {
                                                "type": "string"
                                            },
                                            "message": {
                                                "type": "string"
                                            },
                                            "errors": {
                                                "type": "array",
                                                "items": {
                                                    "message": {
                                                        "type": "string",
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "500": {
                            "description": "Error while getting admins"
                        }
                    }
                }
            },
            "/signalements/create": {
                "post": {
                    "tags": [
                        "signalements"
                    ],
                    "security": [{"BearerAuth": []}],
                    "summary": "Permet de créer un signalement",
                    "requestBody": {
                        "required": true,
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "coordinates": {
                                            "type": "object",
                                            "properties": {
                                                "latitude": {
                                                    "type": "number"
                                                },
                                                "longitude": {
                                                    "type": "number"
                                                }
                                            }
                                        },
                                        "selectedDangerItems": {
                                            "type": "array",
                                            "items": {
                                                "type": "string"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "responses": {
                        "200": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "status": {
                                                "type": "string"
                                            },
                                            "message": {
                                                "type": "string"
                                            },
                                            "data": {
                                                "type": "object",
                                                "properties": {
                                                    "coordinates": {
                                                        "type": "object",
                                                        "properties": {
                                                            "latitude": {
                                                                "type": "number"
                                                            },
                                                            "longitude": {
                                                                "type": "number"
                                                            }
                                                        }
                                                    },
                                                    "selectedDangerItems": {
                                                        "type": "array",
                                                        "items": {
                                                            "type": "string"
                                                        }
                                                    },
                                                    "id": {
                                                        "type": "number"
                                                    },
                                                    "userId": {
                                                        "type": "string"
                                                    },
                                                    "updatedAt": {
                                                        "type": "string",
                                                        "format": "date-time"
                                                    },
                                                    "createdAt": {
                                                        "type": "string",
                                                        "format": "date-time"
                                                    },
                                                },
                                            },
                                        },
                                    }
                                }
                            }
                        },
                        "400": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "status": {
                                                "type": "string"
                                            },
                                            "message": {
                                                "type": "string"
                                            },
                                            "data": {
                                                "type": "object",
                                                "properties": {
                                                    "coordinates": {
                                                        "type": "object",
                                                        "properties": {
                                                            "latitude": {
                                                                "type": "number"
                                                            },
                                                            "longitude": {
                                                                "type": "number"
                                                            }
                                                        }
                                                    },
                                                    "selectedDangerItems": {
                                                        "type": "array",
                                                        "items": {
                                                            "type": "string"
                                                        }
                                                    },
                                                    "id": {
                                                        "type": "number"
                                                    },
                                                    "userId": {
                                                        "type": "string"
                                                    },
                                                    "updatedAt": {
                                                        "type": "string",
                                                        "format": "date-time"
                                                    },
                                                    "createdAt": {
                                                        "type": "string",
                                                        "format": "date-time"
                                                    },
                                                },
                                            },
                                        },
                                    }
                                }
                            }
                        },
                        "500": {
                            "description": "Error while creating signalement"
                        }
                    }
                }
            },
            "/signalements/list": {
                "get": {
                    "tags": [
                        "signalements"
                    ],
                    "security": [{"BearerAuth": []}],
                    "summary": "Permet de récupérer la liste des signalements",
                    "responses": {
                        "200": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "status": {
                                                "type": "string"
                                            },
                                            "message": {
                                                "type": "string"
                                            },
                                            "data": {
                                                "type": "array",
                                                "items": {
                                                    "type": "object",
                                                    "properties": {
                                                        "coordinates": {
                                                            "type": "object",
                                                            "properties": {
                                                                "latitude": {
                                                                    "type": "number"
                                                                },
                                                                "longitude": {
                                                                    "type": "number"
                                                                }
                                                            }
                                                        },
                                                        "selectedDangerItems": {
                                                            "type": "array",
                                                            "items": {
                                                                "type": "string"
                                                            }
                                                        },
                                                        "id": {
                                                            "type": "number"
                                                        },
                                                        "userId": {
                                                            "type": "string"
                                                        },
                                                        "updatedAt": {
                                                            "type": "string",
                                                            "format": "date-time"
                                                        },
                                                        "createdAt": {
                                                            "type": "string",
                                                            "format": "date-time"
                                                        },
                                                    },
                                                },
                                            }
                                        },
                                    }
                                }
                            }
                        },
                        "400": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "status": {
                                                "type": "string"
                                            },
                                            "message": {
                                                "type": "string"
                                            },
                                            "data": {
                                                "type": "array",
                                                "items": {
                                                    "type": "object",
                                                    "properties": {
                                                        "coordinates": {
                                                            "type": "object",
                                                            "properties": {
                                                                "latitude": {
                                                                    "type": "number"
                                                                },
                                                                "longitude": {
                                                                    "type": "number"
                                                                }
                                                            }
                                                        },
                                                        "selectedDangerItems": {
                                                            "type": "array",
                                                            "items": {
                                                                "type": "string"
                                                            }
                                                        },
                                                        "id": {
                                                            "type": "number"
                                                        },
                                                        "userId": {
                                                            "type": "string"
                                                        },
                                                        "updatedAt": {
                                                            "type": "string",
                                                            "format": "date-time"
                                                        },
                                                        "createdAt": {
                                                            "type": "string",
                                                            "format": "date-time"
                                                        },
                                                    },
                                                },
                                            }
                                        },
                                    }
                                }
                            }
                        },
                        "500": {
                            "description": "Error while getting signalements"
                        }
                    }
                }
            },
            "/signalements/{id}": {
                "get": {
                    "tags": [
                        "signalements"
                    ],
                    "security": [{"BearerAuth": []}],
                    "summary": "Permet de récupérer un signalement spécifique",
                    "parameters": [
                        {
                            "name": "id",
                            "in": "path",
                            "required": true,
                            "description": "Identifiant du signalement à récupérer",
                            "schema": {
                                "type": "integer"
                            }
                        }
                    ],
                    "responses": {
                        "200": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "status": {
                                                "type": "string"
                                            },
                                            "message": {
                                                "type": "string"
                                            },
                                            "data": {
                                                "type": "object",
                                                "properties": {
                                                    "coordinates": {
                                                        "type": "object",
                                                        "properties": {
                                                            "latitude": {
                                                                "type": "number"
                                                            },
                                                            "longitude": {
                                                                "type": "number"
                                                            }
                                                        }
                                                    },
                                                    "selectedDangerItems": {
                                                        "type": "array",
                                                        "items": {
                                                            "type": "string"
                                                        }
                                                    },
                                                    "id": {
                                                        "type": "number"
                                                    },
                                                    "userId": {
                                                        "type": "string"
                                                    },
                                                    "updatedAt": {
                                                        "type": "string",
                                                        "format": "date-time"
                                                    },
                                                    "createdAt": {
                                                        "type": "string",
                                                        "format": "date-time"
                                                    },
                                                },
                                            },
                                        },
                                    }
                                }
                            }
                        },
                        "400": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "status": {
                                                "type": "string"
                                            },
                                            "message": {
                                                "type": "string"
                                            },
                                            "data": {
                                                "type": "object",
                                                "properties": {
                                                    "coordinates": {
                                                        "type": "object",
                                                        "properties": {
                                                            "latitude": {
                                                                "type": "number"
                                                            },
                                                            "longitude": {
                                                                "type": "number"
                                                            }
                                                        }
                                                    },
                                                    "selectedDangerItems": {
                                                        "type": "array",
                                                        "items": {
                                                            "type": "string"
                                                        }
                                                    },
                                                    "id": {
                                                        "type": "number"
                                                    },
                                                    "userId": {
                                                        "type": "string"
                                                    },
                                                    "updatedAt": {
                                                        "type": "string",
                                                        "format": "date-time"
                                                    },
                                                    "createdAt": {
                                                        "type": "string",
                                                        "format": "date-time"
                                                    },
                                                },
                                            },
                                        },
                                    }
                                }
                            }
                        },
                        "404": {
                            "description": "Signalement not found"
                        },
                        "500": {
                            "description": "Error while getting signalement"
                        }
                    }
                },
                "put": {
                    "tags": [
                        "signalements"
                    ],
                    "summary": "Permet de mettre à jour les données d'un signalement spécifique",
                    "parameters": [
                        {
                            "name": "id",
                            "in": "path",
                            "required": true,
                            "description": "Identifiant du signalement à mettre à jour",
                            "schema": {
                                "type": "integer"
                            }
                        }
                    ],
                    "requestBody": {
                        "required": true,
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "coordinates": {
                                            "type": "object",
                                            "properties": {
                                                "latitude": {
                                                    "type": "number"
                                                },
                                                "longitude": {
                                                    "type": "number"
                                                }
                                            }
                                        },
                                        "selectedDangerItems": {
                                            "type": "array",
                                            "items": {
                                                "type": "string"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "responses": {
                        "200": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "status": {
                                                "type": "string"
                                            },
                                            "message": {
                                                "type": "string"
                                            },
                                            "data": {
                                                "type": "object",
                                                "properties": {
                                                    "coordinates": {
                                                        "type": "object",
                                                        "properties": {
                                                            "latitude": {
                                                                "type": "number"
                                                            },
                                                            "longitude": {
                                                                "type": "number"
                                                            }
                                                        }
                                                    },
                                                    "selectedDangerItems": {
                                                        "type": "array",
                                                        "items": {
                                                            "type": "string"
                                                        }
                                                    },
                                                    "id": {
                                                        "type": "number"
                                                    },
                                                    "userId": {
                                                        "type": "string"
                                                    },
                                                    "updatedAt": {
                                                        "type": "string",
                                                        "format": "date-time"
                                                    },
                                                    "createdAt": {
                                                        "type": "string",
                                                        "format": "date-time"
                                                    },
                                                },
                                            },
                                        },
                                    }
                                }
                            }
                        },
                        "400": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "status": {
                                                "type": "string"
                                            },
                                            "message": {
                                                "type": "string"
                                            },
                                            "data": {
                                                "type": "object",
                                                "properties": {
                                                    "coordinates": {
                                                        "type": "object",
                                                        "properties": {
                                                            "latitude": {
                                                                "type": "number"
                                                            },
                                                            "longitude": {
                                                                "type": "number"
                                                            }
                                                        }
                                                    },
                                                    "selectedDangerItems": {
                                                        "type": "array",
                                                        "items": {
                                                            "type": "string"
                                                        }
                                                    },
                                                    "id": {
                                                        "type": "number"
                                                    },
                                                    "userId": {
                                                        "type": "string"
                                                    },
                                                    "updatedAt": {
                                                        "type": "string",
                                                        "format": "date-time"
                                                    },
                                                    "createdAt": {
                                                        "type": "string",
                                                        "format": "date-time"
                                                    },
                                                },
                                            },
                                        },
                                    }
                                }
                            }
                        },
                        "404": {
                            "description": "Signalement not found"
                        },
                        "500": {
                            "description": "Error while updating signalement"
                        }
                    }
                },
                "delete": {
                    "tags": [
                        "signalements"
                    ],
                    "summary": "Permet de supprimer un signalement spécifique",
                    "parameters": [
                        {
                            "name": "id",
                            "in": "path",
                            "required": true,
                            "description": "Identifiant du signalement à supprimer",
                            "schema": {
                                "type": "integer"
                            }
                        }
                    ],
                    "responses": {
                        "200": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "status": {
                                                "type": "string"
                                            },
                                            "message": {
                                                "type": "string"
                                            },
                                            "data": {
                                                "type": "object",
                                                "properties": {
                                                    "coordinates": {
                                                        "type": "object",
                                                        "properties": {
                                                            "latitude": {
                                                                "type": "number"
                                                            },
                                                            "longitude": {
                                                                "type": "number"
                                                            }
                                                        }
                                                    },
                                                    "selectedDangerItems": {
                                                        "type": "array",
                                                        "items": {
                                                            "type": "string"
                                                        }
                                                    },
                                                    "id": {
                                                        "type": "number"
                                                    },
                                                    "userId": {
                                                        "type": "string"
                                                    },
                                                    "updatedAt": {
                                                        "type": "string",
                                                        "format": "date-time"
                                                    },
                                                    "createdAt": {
                                                        "type": "string",
                                                        "format": "date-time"
                                                    },
                                                },
                                            },
                                        },
                                    }
                                }
                            }
                        },
                        "400": {
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "status": {
                                                "type": "string"
                                            },
                                            "message": {
                                                "type": "string"
                                            },
                                            "data": {
                                                "type": "object",
                                                "properties": {
                                                    "coordinates": {
                                                        "type": "object",
                                                        "properties": {
                                                            "latitude": {
                                                                "type": "number"
                                                            },
                                                            "longitude": {
                                                                "type": "number"
                                                            }
                                                        }
                                                    },
                                                    "selectedDangerItems": {
                                                        "type": "array",
                                                        "items": {
                                                            "type": "string"
                                                        }
                                                    },
                                                    "id": {
                                                        "type": "number"
                                                    },
                                                    "userId": {
                                                        "type": "string"
                                                    },
                                                    "updatedAt": {
                                                        "type": "string",
                                                        "format": "date-time"
                                                    },
                                                    "createdAt": {
                                                        "type": "string",
                                                        "format": "date-time"
                                                    },
                                                },
                                            },
                                        },
                                    }
                                }
                            }
                        },
                        "404": {
                            "description": "Signalement not found"
                        },
                        "500": {
                            "description": "Error while deleting signalement"
                        }
                    }
                }
            }
        },
        "components": {
            "securitySchemes": {
                "BearerAuth": {
                    "type": "http",
                    "scheme": "bearer",
                    "bearerFormat": "JWT",
                }
            },
            "schemas": {
                "User": {
                    "type": "object",
                    "properties": {
                        "email": {
                            "type": "string"
                        },
                        "password": {
                            "type": "string"
                        },
                        "firstName": {
                            "type": "string"
                        },
                        "lastName": {
                            "type": "string"
                        }
                    }
                }
            }
        }
    },
    apis: ['./routes/*.ts'],
};