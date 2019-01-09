pragma experimental ABIEncoderV2;

contract Ownable {
    address public owner;

    event OwnershipRenounced(address indexed previousOwner);
    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    /**
   * @dev Throws if called by any account other than the owner.
   */
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    /**
   * @dev Allows the current owner to transfer control of the contract to a newOwner.
   * @param newOwner The address to transfer ownership to.
   */
    function transferOwnership(address newOwner)public onlyOwner {
        require(newOwner != address(0));
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

    /**
   * @dev Allows the current owner to relinquish control of the contract.
   */
    function renounceOwnership()public onlyOwner {
        emit OwnershipRenounced(owner);
        owner = address(0);
    }
}

contract Pausable is Ownable {
    event Pause();
    event Unpause();

    bool public paused = false;

    /**
   * @dev Modifier to make a function callable only when the contract is not paused.
   */
    modifier whenNotPaused() {
        require(!paused);
        _;
    }

    /**
   * @dev Modifier to make a function callable only when the contract is paused.
   */
    modifier whenPaused() {
        require(paused);
        _;
    }

    /**
   * @dev called by the owner to pause, triggers stopped state
   */
    function pause()onlyOwner whenNotPaused public {
        paused = true;
        emit Pause();
    }

    /**
   * @dev called by the owner to unpause, returns to normal state
   */
    function unpause()onlyOwner whenPaused public {
        paused = false;
        emit Unpause();
    }
}
contract freelancer is Pausable {
    /**
   * @dev Structure to save more than one type of var of users
   */
    struct personal_info {
        string name;
        string specialization;
        uint age;
        string qualification;
        string experience;
        string rateperhour;
        address user;
    }
    personal_info[] public Personal;
    
    /**
   * @dev Structure to save job related information
   */ 
    struct job_info {
        string jobname;
        string jobexplan;
        uint auctionEnd;
        uint auctionStart;
        uint salary;
        string designation;
        string department;
        address user;
        uint state;
        uint jobduration;
    }
    job_info[] public Jobs;
    /**
   * @dev Structure to save bids placed for job
   */ 
    struct bids_placed {
        address jobaddress;
        address useraddress;
        uint price;
        uint daytoComplete;
    }
    bids_placed[] public Bids;

    /**
   * @dev Check user is added or not
   */ 
    function viewUsers(address _address) view public returns (bool){
        for(uint256 i = 0; i < Personal.length; i++){
            if(Personal[i].user == _address ) return true;
         }
         return false;
    }

    /**
   * @dev insertion of new user for both worker as well as customer
   */ 
    function insertion(string memory _name,uint _age, string memory _specialization, string memory _qualification, string memory _experience, string memory _rateperhour) whenNotPaused public {
        require(!viewUsers(msg.sender));
        Personal.push(personal_info({
            name: _name,
            age: _age,
            specialization: _specialization,
            qualification: _qualification,
            experience: _experience,
            rateperhour: _rateperhour,
            user: msg.sender
        }));
    }
    
    // Placement of job
    function jobPlacement(string memory _jobname,string memory _jobexplan, uint256 _duration, uint256 _salary, string memory _designation, string memory _department) whenNotPaused onlyOwner public {
         require(viewUsers(msg.sender));
         require(Jobs.length==0);
            Jobs.push(job_info({
            jobname: _jobname,
            jobexplan: _jobexplan,
            salary: _salary,
            designation: _designation,
            department: _department,
            auctionEnd: now +(1 * 2880 minutes),
            auctionStart: now,
            user:msg.sender,
            state: 0,
            jobduration: _duration
            }));
    }
    
        /**
        View all Jobs
    **/
    function jobdetail() public view returns(job_info[] memory) {
        return Jobs;
    }
    
        /**
   * @dev Check user has done bid or not
   */ 
    function bidsUsers(address _address) view public returns (bool){
        for(uint256 i = 0; i < Bids.length; i++){
            if(Bids[i].useraddress == _address) return true;
         }
         return false;
    }
     
    //Apply for jobs whose auction time is not ended
    function jobApply(address _applyjob, uint _price, uint _daytoComplete) whenNotPaused public returns(bool){
        require(msg.sender != owner);
        require(viewUsers(msg.sender));
        require(Jobs[0].state==0);
        require(!bidsUsers(msg.sender));
        Bids.push(bids_placed({
            jobaddress: _applyjob,
            useraddress: msg.sender,
            price: _price,
            daytoComplete: _daytoComplete
        }));
        return true;
    }
    
        //Select one to complete jobname
    function viewallBidders() onlyOwner whenPaused public view returns(bids_placed[] memory){
            return Bids;
        }
}

contract Sahulat  is freelancer{
    constructor() public {
        owner = msg.sender;
    }
    function () external payable {

    }
}
