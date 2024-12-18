document.addEventListener("DOMContentLoaded", function () {

  document.getElementById("convert_1").addEventListener("click", function() {

    var input = document.getElementById("input_value_1");
    getInput = input.value;

    var toInt = parseInt(getInput);
    var intToHex = toInt.toString(16);
    console.log(toInt);
    console.log("=> " + intToHex);

    var getOutput = document.getElementById("output_1");
    getOutput.innerText = intToHex;

  })

  document.getElementById("convert_2").addEventListener("click", function() {

    var input = document.getElementById("input_value_2");
    getInput = input.value;

    var toDec = parseInt(getInput, 16);


    var getOutput = document.getElementById("output_2");
    getOutput.innerText = toDec;

  })

  document.getElementById("convert_3").addEventListener("click", function() {

    var input = document.getElementById("input_value_3");
    getInput = input.value;

    var toDec = parseInt(getInput, 2);


    var getOutput = document.getElementById("output_3");
    getOutput.innerText = toDec;

  })

  document.getElementById("convert_4").addEventListener("click", function() {

    var input = document.getElementById("input_value_4");
    getInput = input.value;

    var toInt = parseFloat(getInput);
    var intToHex = toInt.toString(2);


    var getOutput = document.getElementById("output_4");
    getOutput.innerText = intToHex;

  })

  document.getElementById("convert_5").addEventListener("click", function() {

    var input = document.getElementById("input_value_5");
    getInput = input.value; //it gets the value

    //get number after decimal point
    var toInt = parseFloat(getInput);
    var getPostDec_ = toInt % 1;
    var getPostDec = Math.round(getPostDec_ * 10000) / 10000;

    //get number before decimal point
    var getPreDec = parseInt(getInput);

    //conver to binary
    var preBin = getPreDec.toString(2);
    var postBin = getPostDec.toString(2);

    //var test = parseFloat(postBin).toPrecision(17);
    //console.log("=== " + test);
    
    var prePostBin = (parseFloat(preBin) + parseFloat(postBin));

    function expo(x, f) {
      return Number.parseFloat(x).toExponential(f);
    }

    var prePostBinExpo = expo(prePostBin, preBin.length - 1)

    console.log(getPreDec + "=> " + preBin);
    console.log(getPostDec + "=> " + postBin);
    console.log("=== " + prePostBin);
    console.log("==> " + prePostBinExpo);

    var getExponent; 
    var getArrayExpo = prePostBinExpo[prePostBinExpo.length - 2];
    console.log(getArrayExpo);

    if (getArrayExpo == "-") {
      var negExpo = "-" + prePostBinExpo[prePostBinExpo.length - 1];
      getExponent = parseInt(negExpo);
      console.log("exponent bias is negative" + getExponent);
    }
    else {
      getExponent = parseInt(prePostBinExpo[prePostBinExpo.length - 1]);
    }
    console.log(getExponent);

    const EXPO_BIAS = 127;
    var expoBit = EXPO_BIAS + getExponent;
    var expoBitBin = expoBit.toString(2);

    console.log("===> " + expoBit);
    console.log("=> " + expoBitBin);

    var signBit;

    var getSignBit = Math.sign(toInt);
    console.log(getSignBit);

    if (getSignBit == 1) {
      console.log("number is positive");
      signBit = 0;
    }
    else {
      console.log("number is negative");
      signBit = 1;
    }

    var getMantissa_ = (prePostBin * Math.pow(10, -(preBin.length - 1))) % 1;
    var getMantissa = Math.round(getMantissa_ * 1000000000000) / 1000000000000;
    console.log("mantissa => " + getMantissa);
    console.log(prePostBin * Math.pow(10, -(preBin.length - 1)));
    var test_1 = String(getMantissa)

    var mantissa = test_1.slice(2);
    console.log("manitssa => " + mantissa);

    var ieee_754 = signBit + expoBitBin + mantissa;
    
    var getOutput = document.getElementById("output_5");
    getOutput.innerText = ieee_754;

  })

  document.getElementById("convert_6").addEventListener("click", function() {

    var input = document.getElementById("input_value_6");
    getInput = input.value; //it gets the value 

    var toDec = getInput.replaceAll(' ', '');
    console.log("fixed=> " + toDec);

    var setSign;

    if (toDec[0] == "0") {
      setSign = 0;
    }
    else {
      setSign = -1;
    }

    var expoBit = toDec.slice(1);
    console.log(expoBit);

    var sumBin = 0;

    for (i = 0; i < 8; i++) {

      console.log(expoBit[i]);
      sumBin += expoBit[i];

    }
    console.log(sumBin);
    var sumBin_ = sumBin.slice(1);
    console.log("=> " + sumBin_);

    binToDec = parseInt(sumBin_, 2);

    const EXPO_BIAS = 127;
    var e = binToDec - EXPO_BIAS;
    console.log("==> " + e);

    var fractBit = toDec.slice(9);
    console.log(fractBit);

    var mSum = 0;

    for (i = 0; i < 15; i++) {

      var j = 1 - (i + 2);
      console.log(fractBit[i] * Math.pow(2, j));
      var mEq= fractBit[i] * Math.pow(2, j)

      mSum += mEq;
    }

    console.log("=> " + mSum);

    var ieee_754 = Math.pow(-1, setSign) * (1 + mSum) * Math.pow(2, e);
    console.log(ieee_754);

    var getOutput = document.getElementById("output_6");
    getOutput.innerText = ieee_754; //whatever variable is

  })
})