
function checkCashRegister(price,cash,cid) {
    let obj = {status: "UNDEFINED", change: []}; 
    let changeDue = cash-price;
    
    // 1. First of all, let's declare a function that checks if we have enough cash to cover the change due (cid stands for Cash In Draw, which is passed as a parameter):
    checkChange(changeDue, cid); 
           return obj;
      
      function checkChange(changeDue, cid){
      let sumCid = 0;
      for (let i=0; i<cid.length; i++) {
        sumCid = +(sumCid+cid[i][1]).toFixed(2); 
      }
      if(changeDue == sumCid) {
        obj.status = "CLOSED"
        cid.forEach((currency) => obj.change.push(currency));
        return obj;
      } else if (changeDue > sumCid) {
        obj.status = "INSUFFICIENT_FUNDS";
        return obj;
      } else if (changeDue < sumCid) {
         return checkGivenChange(changeDue, obj, cid);
      }
        }
    
      //2. If we have enough cash, let's figure out how much of each currency should be given to the costumer:

      function checkGivenChange(changeDue, obj, cid) {
    let currentUnit = [0.01,0.05, 0.1, 0.25, 1, 5, 10, 20, 100];
    let currentChange =  +(changeDue).toFixed(2);
    let givenChange = [];
    
    while (currentChange >= 0) {
    for (let j= currentUnit.length -1; j>=0; j--) {
    let amount = 0; //> 2.1 the amount of currencyUnit used in each loop.
      //2.2.Check for the accurate currency unit to be used. If the currency unit is less than or equal to the current change due, we will check for that.
      if (currentChange >= currentUnit[j]) { 
        //2.3 While there's remaining change AND available Cash for each currencyUnit, push the corresponding amount of money used to the final object.
        let availableCash = cid[j][1]; // > 2.4. Available Cash is passed as an argument 
        if (availableCash - currentUnit[j] >= 0) {
        while (currentChange - currentUnit[j] >= 0 && availableCash - currentUnit[j] >=0) { // > 2.5. As long as there's remaining change AND available CurrencyUnit in the cash, we will update 3 variables: currentChange, amount and availableCash.
          currentChange = +((currentChange - currentUnit[j]).toFixed(2)); 
          amount++;
          availableCash = availableCash - currentUnit[j];
        } 
    //2.6. Before proceeding to check the next Currency unit,we will update the corresponding CID, poping out the available cash and pushing back the final amount used (currenUnit * amount used). Finally, we will push the CID to the change property in the final object.
        cid[j].pop();
        cid[j].push(currentUnit[j]*amount);
       givenChange.push(cid[j]);
    
        } else {
    return checkResult(givenChange, obj);
        }
        
     }  
     }    
    return checkResult(givenChange, obj);
    }
    }
     
//3. Once checked the givenChange, let's return the final object: if the givenChange array is empty, means we don't have enough cash to give to the costumer (we actually have cash but not in the currency unit needed for that purpose). If the givenChange is not empty, means we have enough cash to give to the costumer.

     function checkResult(givenChange, obj) {
        if (givenChange.length == 0) {
          obj.status = "INSUFFICIENT_FUNDS";
          obj.change =  []
        } else if (givenChange.length > 0) {
          obj.status = "OPEN";
          obj.change =  givenChange;
        } 
         return obj;
      }
      
    
    }
    
    checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
    
    