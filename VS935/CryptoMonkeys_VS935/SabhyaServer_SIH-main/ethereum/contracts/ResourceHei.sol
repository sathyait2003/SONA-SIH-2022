// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract ResourceHei {
    Resource[] public Resources;

    function createResource(uint256 minimum) public returns(Resource){
        Resource newResource = new Resource(minimum, msg.sender);
        Resources.push(newResource);
        return newResource;
    }

    function getResources() public view returns (Resource[] memory) {
        return Resources;
    }
}

contract Resource {
    struct file {        
        uint id;
        address payable uploader;
        string description;
        uint256 minimumContribution;
        uint256 subscribersCount;
        uint timestamp;        
    }
    struct fileConfidential{
        string hash;
        mapping(address => bool) subscribers;
    }
    address public manager;
    uint256 public minimumContribution;
    uint256 public userCount;
    uint256 public filesCount;
    uint256 fileIndex = 0;

    mapping(uint256 => fileConfidential) hashes;
    file[] public files;
    mapping(address => bool) public users;

    
    constructor(uint256 minimum, address creator) {
        manager = creator;
        minimumContribution = minimum;
    }

    modifier restricted() {
        require(msg.sender == manager, "manager privileges only");
        _;
    }

    modifier hasBalance(uint id) {
        require(files[id].minimumContribution<=address(this).balance, "Not sufficient balance");
        _;
    }

    function subscribeToInstitution() public payable {
        require(
            msg.value > minimumContribution,
            "minimum contribution required"
        );
        if (!users[msg.sender]) {
            users[msg.sender] = true;
            userCount++;
        }
    }

    function uploadfile(
        string memory description,
        string memory hash,
        uint256 value,
        address payable recipient
    ) public {        
        file memory newfile =  file(fileIndex,recipient,description,value,0,block.timestamp);
        files.push(newfile);
        fileConfidential storage h=hashes[fileIndex];
        h.hash=hash;
        fileIndex++;
        filesCount++;
    }

    function getAllFiles() public view returns (file[] memory){
        return  files;
    }
    function contributeAndDownloadFile(uint id) public payable hasBalance(id) returns(string memory){
        file storage r = files[id];
        fileConfidential storage h= hashes[id];
        r.uploader.transfer(r.minimumContribution);
        if(!h.subscribers[msg.sender]){
            h.subscribers[msg.sender]=true;
        }
        return h.hash;
    }

    function downloadFile(uint id) public view returns(string memory){        
        fileConfidential storage h= hashes[id];
        require(h.subscribers[msg.sender],"Not subscribed to the file yet");        
        return h.hash;
    }

    function getHeiDetails()
        public
        view
        returns (
            uint256,
            uint256,
            uint256,
            address
        )
    {   
        return (
            minimumContribution,
            filesCount,
            userCount,
            manager
        );
    }

    function getfilesCount() public view returns (uint256) {
        return filesCount;
    }
}