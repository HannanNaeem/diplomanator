var MyToken = artifacts.require ("./MyToken");
var RecordAdder = artifacts.require("./RecordAdder");

module.exports = function(deployer) {      
    deployer.deploy(MyToken);
    deployer.deploy(RecordAdder);
}