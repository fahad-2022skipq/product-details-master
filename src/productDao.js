const fs = require("fs")
//import fs module

const getProducts = function (done) {
  //parse the filecontent and save it in another varible say productdata
  //return the callback with first parameter as undefined and second parameter as productdata
  fs.readFile("src/products.json", (error, FileList) => {
    if (error) return done("Error while reading data")
    else {
      let productdata = JSON.parse(FileList)
      return done(undefined, productdata)
    }
  })
}

//The function getProductById will take two parameters first the id and second the callback
//It will read the product.json file
const getProductById = function (id, done) {
  //write all the logical steps
  //return the callback with first parameter as undefined and second parameter as productDetails
  fs.readFile("src/products.json", (error, FileList) => {
    if (error) return done("Error while reading data")
    else {
      let products = JSON.parse(FileList)
      let product = products.find(p => p.id == id)
      if (product === undefined) {
        return done("No product found for specified id");
      }
      return done(undefined, product)
    }
  })
}

//The saveProductDetails method will take productDetails and done as callback
//It will read the product.json file
const saveProductDetails = function (ProductDetails, done) {
  //write all the logical steps
  //parse the filecontent and save it in another varible say productdata
  //push the productDetails in the productData

  //Write the productData into the file 
  fs.readFile("src/products.json", (err, filecontent) => {
    if (err) return done("Error while reading data")
    else {
      let productdata = JSON.parse(filecontent);
      productdata.push(ProductDetails)
      fs.writeFile("src/products.json", JSON.stringify(productdata), (err, updatedContent) => {
        if (err) return done("Error saving product")
        else return done(undefined, ProductDetails)
      })
    }
  })
  //return the callback with undefined and ProductDetails
}

//The method deleteProductById will take productId and done as parameters
//It will read the product.json file

const deleteProductById = function (productId, done) {
  //Write all the logical steps
  //return the callback with first parameter as undefined and second parameter as productDetails
  fs.readFile("src/products.json", (err, filecontent) => {
    if (err) return done("Error while reading data")
    else {
      let productdata = JSON.parse(filecontent);
      let index = productdata.findIndex(p => p.id == productId)
      console.log(index)
      if (index == -1) return done("No product found for specified product ID")
      else {
        let product = productdata[index];
        productdata.splice(index, 1);
        fs.writeFile("./Week 2/product-details-master/src/products.json", JSON.stringify(productdata), (err, updatedContent) => {
          if (err) return done("Error Deleting product")
          else return done(undefined, product)
        })
      }
    }
  })
}


module.exports = {
  getProducts,
  getProductById,
  saveProductDetails,
  deleteProductById
}