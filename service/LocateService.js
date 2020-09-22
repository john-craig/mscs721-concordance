'use strict';


/**
 * Calculate
 * Post text to generate locations
 *
 * body String Text to be analyzed (optional)
 * returns location_result
 **/
exports.getLocations = function(body) {
  return new Promise(function(resolve, reject) {
    var location = []

    if(typeof body !== "string"){
      const error = {"error": "Please post a string in text/plain format"}

      resolve(error)
    } else {
      var partialLocation = {}
      var tokens = body.split(' ')
      tokens = standardize(tokens)

      console.log(tokens)

      tokens.forEach((token, index) => {

        if(partialLocation[token] == undefined) {
          var locations = []
          locations.push(index)

          partialLocation[token] = locations
        } else {
          var locations = partialLocation[token]
          locations.push(index)

          partialLocation[token] = locations
        }
      })

      location = Object.keys(partialLocation).map(key => {
        return {
          "token": key,
          "locations": partialLocation[key]
        }
      })
    }

    if (location.length > 0) {
      resolve(location);
    } else {
      resolve();
    }
  });
}

function standardize(stringArray){
  const standardizedArray = stringArray.map(element => {
    var standardized = element

    standardized = standardized.toLowerCase()
    standardized = standardized.replace(/[^0-9a-z]/gi, '')

    return standardized
  })

  return standardizedArray
}