// - Créer une suite de tests et de la nommer.
// - Ajouter plusieurs versions d'un algorithme.
// - Configurer le nombre de fois que chaque version de l'algorithme sera exécutée.
// - Transmettre les mêmes paramètres à chaque version de l'algorithme.
// - Afficher la performance moyenne (en millisecondes) de chaque version de l'algorithme.
// - Affiche la version la plus rapide et la plus lente.


const Test = {

    testTimeFunc : function(func, ...args)
    {
        let start = performance.now();
        let r = func(...args);
        let end = performance.now();
        return (end-start);
    },


    liste_suite : {},
    addSuite : function(name){
        this.liste_suite[name] = [];
    },
    addTest : function(suiteName, func, nTime){
        this.liste_suite[suiteName].push({func, nTime});
    },
    run : function(suiteName, ...args){
        let hash_function = [];

        for (let test of this.liste_suite[suiteName] )
        {
            let total = 0;
            for (let i = 0; i < test.nTime; i++)
            {
                total += this.testTimeFunc(test.func, ...args);
            }
            console.log('function : ' + test.func.name + ' en moyenne : ' + (total/test.nTime) + ' ms' );
            hash_function.push({ name : test.func.name, time : total/test.nTime});
        }

        let max = hash_function[0];
        let min = hash_function[0];


        for (let f of hash_function)
        {
            if (f.time > max.time)
            {
                max = f;
            }
            if (f.time < min.time)
            {
                min = f;
            }
        }

        console.log('function : ' + max.name + ' est la plus rapide avec ' + max.time + ' ms' );
        console.log('function : ' + min.name + ' est la plus lente avec ' + min.time + ' ms' );
    }
}



function containsDuplicate(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] === array[j]) {
        return true;
      }
    }
  }
  return false;
}


function findCommonElements(array1, array2) {
  let commonElements = [];
  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array2.length; j++) {
      if (array1[i] === array2[j]) {
        commonElements.push(array1[i]);
      }
    }
  }
  return commonElements;
}


function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}




let myTest = Object.create(Test);

myTest.addSuite('containsDuplicate');
myTest.addTest('containsDuplicate', containsDuplicate, 10);
myTest.addTest('containsDuplicate', containsDuplicate, 10);
myTest.run('containsDuplicate', [1,2,3,4,5,6,7,8,9,10]);

console.log("\n\n\n");


myTest.addSuite('fibonacci');
myTest.addTest('fibonacci', fibonacci, 10);
myTest.addTest('fibonacci', fibonacci, 10);
myTest.run('fibonacci', 20);