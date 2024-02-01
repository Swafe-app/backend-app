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
                    "summary": "Créer un nouvel utilisateur",
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
                    "summary": "Pour se connecter ",
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
                    "summary": "Récupérer un utilisateur",
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
                    "summary": "Mettre à jour l'utilisateur",
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
                    "summary": "Mettre à jour le mot de passe de l'utilisateur",
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
                            "description": "Token for email verification",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        }
                    ],
                    "summary": "Permet de vérifier son mail",
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
                    "summary": "Permet d'uploader un selfie pour un utlisateur",
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
                    "summary": "Permet de supprimer un utilisateur",
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
                    "summary": "Permet de créer un admin",
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
            "/admins/adminList": {
                "get": {
                    "tags": [
                        "admins"
                    ],
                    "security": [{"BearerAuth": []}],
                    "summary": "Get all admins",
                    "responses": {
                        "200": {
                            "description": "Admins retrieved successfully"
                        },
                        "404": {
                            "description": "Admins not found"
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
                    "summary": "Get all admins",
                    "responses": {
                        "200": {
                            "description": "Admins retrieved successfully"
                        },
                        "404": {
                            "description": "Admins not found"
                        },
                        "500": {
                            "description": "Error while getting admins"
                        }
                    }
                }
            },
            "/users/selfieStatus": {
                "tags": [
                    "admins"
                ],
                "put": {
                    "security": [{"BearerAuth": []}],
                    "summary": "Update a user's selfie status",
                    "requestBody": {
                        "required": true,
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "selfieStatus": {
                                            "type": "string"
                                        },
                                        "uid": {
                                            "type": "string"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "responses": {
                        "200": {
                            "description": "User's selfie status updated successfully"
                        },
                        "400": {
                            "description": "Bad request"
                        },
                        "404": {
                            "description": "User not found"
                        },
                        "500": {
                            "description": "Error while updating user's selfie status"
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
                    "summary": "Create a new signalement",
                    "requestBody": {
                        "required": true,
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "coordinates": {
                                            "type": "string"
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
                            "description": "Signalement created successfully"
                        },
                        "400": {
                            "description": "Bad request"
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
                    "summary": "Récupérer la liste des signalements",
                    "responses": {
                        "200": {
                            "description": "Signalements retrieved successfully"
                        },
                        "404": {
                            "description": "Signalements not found"
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
                    "summary": "Get a specific signalement",
                    "parameters": [
                        {
                            "name": "id",
                            "in": "path",
                            "required": true,
                            "description": "ID of the signalement to retrieve",
                            "schema": {
                                "type": "integer"
                            }
                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "Signalement retrieved successfully"
                        },
                        "400": {
                            "description": "Bad request"
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
                    "summary": "Update a specific signalement",
                    "parameters": [
                        {
                            "name": "id",
                            "in": "path",
                            "required": true,
                            "description": "ID of the signalement to update",
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
                                            "type": "string"
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
                            "description": "Signalement updated successfully"
                        },
                        "400": {
                            "description": "Bad request"
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
                    "summary": "Delete a specific signalement",
                    "parameters": [
                        {
                            "name": "id",
                            "in": "path",
                            "required": true,
                            "description": "ID of the signalement to delete",
                            "schema": {
                                "type": "integer"
                            }
                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "Signalement deleted successfully"
                        },
                        "400": {
                            "description": "Bad request"
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
    apis: ['./routes/*.ts'], // files containing annotations as above
};