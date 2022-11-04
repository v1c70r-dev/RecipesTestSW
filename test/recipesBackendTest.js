const chai = require('chai');
const chaiHttp = require('chai-http');

/************TEST**************/
chai.should();
chai.use(chaiHttp);
chai.use(require('chai-interface'));

describe('API test',()=>{
    /***************************test get all recipes**********************************/
    describe("GET /api/recipe", ()=>{
        it('In a correct GET request, the response must have a correct format', (done)=>{
            chai.request('http://localhost:9000')
            .get('/api/recipe')
            .end((error, response)=>{
                //console.log('response:',JSON.parse(response.text))
                
                JSON.parse(response.text).should.have.interface(
                    {
                        statusCode: Number,
                        success: Boolean,
                        body: Array
                    }
                );
                done();
            })
        }); 
    })

    describe("GET /api/recipe", ()=>{
        it('All the recipes must have a correct type of data and structure', (done)=>{
            chai.request('http://localhost:9000')
            .get('/api/recipe')
            .end((error, response)=>{
                //console.log('response:',JSON.parse(response.text).body)

                JSON.parse(response.text).body.map(r => r.should.have.interface(
                    {
                        _id: String,
                        title: String,
                        steps: Array,
                        ingredients: Array,
                        img: String,
                        __v: Number
                    }
                ));
                done();
            })
        }); 
    });

    describe("GET /api/recipe", ()=>{
        it('If the response is correct, this should return correct values', (done)=>{
            chai.request('http://localhost:9000')
            .get('/api/recipe')
            .end((error, response)=>{
                console.log('response:',JSON.parse(response.text).statusCode)
                JSON.parse(response.text).statusCode.should.be.equal(200);
                JSON.parse(response.text).success.should.be.equal(true);
                //JSON.parse(response.text).body.length.should.be.up(0);
                done();
            })
        }); 
    })

    describe("GET /api/recipe", ()=>{
        it('If the route (url) is incorrect, this call should return an 404 status', (done)=>{
            chai.request('http://localhost:9000')
            .get('/api/bad-route')
            .end((error, response)=>{
                //console.log('response:',response.status);
                response.status.should.be.equal(404);
                done();
            })
        }); 
    })

    /****************************************test POST****************************************/
    
    describe("POST /api/recipe", ()=>{
        it('It should create a new recipe in the data base', (done)=>{
            chai.request('http://localhost:9000')
            .post('/api/recipe')
            .send(
                {
                    "title": "Test POSTE",
                    "steps": [
                        "step 1",
                        "step 2"
                    ],
                    "ingredients": [
                        {
                            "name": "name1",
                            "quantity": "quantity1"
                        },
                        {
                            "name": "name2",
                            "quantity": "quantity2"
                        }
                    ],
                    "img": "some img url"
                }
            )
            .end((error, response)=>{
                response.status.should.be.equal(201);
                done();
            })
        }); 
    })

    describe("GET /api/recipe", ()=>{
        it('The new recipe should be in the body of a new request', (done)=>{
            chai.request('http://localhost:9000')
            .get('/api/recipe')
            .end((error, response)=>{
                //console.log('response:',JSON.parse(response.text).body)
                JSON.parse(response.text).body.includes(
                    {
                        "title": "Test POSTE",
                        "steps": [
                            "step 1",
                            "step 2"
                        ],
                        "ingredients": [
                            {
                                "name": "name1",
                                "quantity": "quantity1"
                            },
                            {
                                "name": "name2",
                                "quantity": "quantity2"
                            }
                        ],
                        "img": "some img url"
                    }
                );
                done();
            })
        }); 
    });

    /***************************test get a recipe by id**********************************/
    /*
    Aquí la idea es hacer un get all, y buscar el primer id. Luego hacer test de estructtura y contenido
    para esa petición
    */

    let id_ = "";
    describe("search the first id /api/recipe", ()=>{
        it('search last id', (done)=>{
            chai.request('http://localhost:9000')
            .get('/api/recipe')
            .end((error, response)=>{
                //console.log('response:',JSON.parse(response.text).body)
                id_ = JSON.parse(response.text).body[0]._id;
                console.log('id',id_)
                done();
            })
        }); 
    })

    describe("GET /api/recipe/:id", ()=>{
        it('In a correct GET by id request, the response must have a correct format', (done)=>{
            chai.request('http://localhost:9000')
            .get(`/api/recipe/${id_}`)
            .end((error, response)=>{
                //console.log('response:',JSON.parse(response.text))
                
                JSON.parse(response.text).should.have.interface(
                    {
                        statusCode: Number,
                        success: Boolean,
                        body: Object
                    }
                );
                done();
            })
        }); 
    })

    describe("GET /api/recipe", ()=>{
        it('The recipe must have a correct type of data and structure', (done)=>{
            chai.request('http://localhost:9000')
            .get(`/api/recipe/${id_}`)
            .end((error, response)=>{
                //console.log('response:',JSON.parse(response.text).body)
                JSON.parse(response.text).body.should.have.interface(
                    {
                        _id: String,
                        title: String,
                        steps: Array,
                        ingredients: Array,
                        img: String,
                        __v: Number
                    }
                );
                done();
            })
        }); 
    });

    describe("GET /api/recipe", ()=>{
        it('If the response is correct, this should return correct values', (done)=>{
            chai.request('http://localhost:9000')
            .get(`/api/recipe/${id_}`)
            .end((error, response)=>{
                console.log('response:',JSON.parse(response.text).statusCode)
                JSON.parse(response.text).statusCode.should.be.equal(200);
                JSON.parse(response.text).success.should.be.equal(true);
                //JSON.parse(response.text).body.length.should.be.up(0);
                done();
            })
        }); 
    })

    describe("GET /api/recipe", ()=>{
        it('If the id is incorrect, this call should return an 500 status and the succes false', (done)=>{
            chai.request('http://localhost:9000')
            .get(`/api/recipe/${id_}8`)
            .end((error, response)=>{
                //console.log('response:',response.status);
                response.status.should.be.equal(500);
                JSON.parse(response.text).success.should.be.equal(false);
                done();
            })
        }); 
    })


    /****************************************test delete by id********************************/ 
    /*La idea en esta prueba es, a través de un get, obtener el id de la última receta 
      y borrarla. Luego, comprobar el borrado llamando al objeto (GEt) por su id. 
      El resultado debe indicar que el objeto no existe
    */

    let id = "";
    describe("search the first id /api/recipe", ()=>{
        it('search last id', (done)=>{
            chai.request('http://localhost:9000')
            .get('/api/recipe')
            .end((error, response)=>{
                //console.log('response:',JSON.parse(response.text).body)
                id = JSON.parse(response.text).body[0]._id;
                console.log('id',id)
                done();
            })
        }); 
    })

    describe("DELETE /api/recipe/:id", ()=>{
        it('It should delete the last recipe', (done)=>{
            chai.request('http://localhost:9000')
            .delete(`/api/recipe/${id}`)
            .end((error, response)=>{
                response.status.should.be.equal(200);
                done();
            })
        }); 
    })

    /* Esto también es útil de revisar y se quedó en el tintero!!
    Respuesta cuando se intenta buscar un objeto q fue borrado
    */

    describe("GET /api/recipe", ()=>{
        it('If we try to get a recipe by id, but that object was deleted', (done)=>{
            chai.request('http://localhost:9000')
            .get(`/api/recipe/${id}`)
            .end((error, response)=>{
                console.log('response succes:',JSON.parse(response.text).body);
                response.status.should.be.equal(200);
                JSON.parse(response.text).success.should.be.equal(true);
                //JSON.parse(response.text).body.should.equal(null);
                done();
            })
        }); 
    })
    
    /**************************************** test put by id ***********************************/ 
    /**
     * La idea es revisar que una recipe existente a cambiado alguna caratcerísstica,
     * por ej el nombre. Para esto se tomará el id de la primera receta, y se guardará en una variable
     * el objeto receta. Luego se modificará el nombre de esta y por último se compararán ambas recetas 
    */

    let idPUT = "";
    let originalRecipe = {};
    let updateRecipe = {};
     
    describe("Search the first id /api/recipe", ()=>{
         it('Search first id', (done)=>{
             chai.request('http://localhost:9000')
             .get('/api/recipe')
             .end((error, response)=>{
                 //console.log('response:',JSON.parse(response.text).body)
                 idPUT = JSON.parse(response.text).body[0]._id;
                 console.log('idPUT',idPUT)
                 done();
             })
         }); 
     })

    describe("GET /api/recipe/:id", ()=>{
        it('Get the recipe with the first id', (done)=>{
            chai.request('http://localhost:9000')
            .get(`/api/recipe/${idPUT}`)
            .end((error, response)=>{
                originalRecipe = JSON.parse(response.text).body;
                updateRecipe = JSON.parse(response.text).body;
                //console.log('originalRecipe', originalRecipe)
                done();
            })
        }); 
    })

    describe("PUT /api/recipe/:id", ()=>{
        it('It should update the first recipe in the data base. The only change should be the title', (done)=>{
            updateRecipe.title = "Change title Test"
            chai.request('http://localhost:9000')
            .put(`/api/recipe/${idPUT}`)
            .send(
                updateRecipe
            )
            .end((error, response)=>{
                response.status.should.be.equal(200);
                console.log('updateRecipe', updateRecipe);
                console.log('originalRecipe', originalRecipe);
                (updateRecipe!=originalRecipe?true:false).should.be.equal(true);
                done();
            })
        });
    })
})