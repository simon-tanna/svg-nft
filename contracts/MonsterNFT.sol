// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

// Give the contract SVG code
// output NFT URI with the SVG code
// store NFT metadata on-chain

contract MonsterNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    // imports interface for erc20 token from IERC20
    IERC20 public tokenAddress;
    uint256 public tokenRate = 15 * 10**18;

    Counters.Counter private _tokenIdCounter;

    constructor(address _tokenAddress) ERC721("MonsterNFT", "MFT") {
        // _tokenAddress is typecast into an IERC20 variable type
        tokenAddress = IERC20(_tokenAddress);
    }

    function create(string memory svg) public {
        // SVG needs to become a token URI (Unique Resource Identifier)
        // this is the image URI
        string memory imgURI = svgToImageURI(svg);
        tokenAddress.transferFrom(msg.sender, address(this), tokenRate);
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
    }

    // function to make svg image readable in the create function to mint the NFT
    function svgToImageURI(string memory svg)
        public
        pure
        returns (string memory)
    {
        // using the openzep base64 contract as a util
        string memory baseURL = "data:image/svg+xml;base64,";
        string memory svgToBase64 = Base64.encode(
            bytes(string(abi.encodePacked(svg)))
        );
        // concat the baseURL and svgToBase64
        string memory imgURI = string(abi.encodePacked(baseURL, svgToBase64));
        return imgURI;
    }

    // function safeMint() public {
    //     tokenAddress.transferFrom(msg.sender, address(this), tokenRate);
    //     uint256 tokenId = _tokenIdCounter.current();
    //     _tokenIdCounter.increment();
    //     _safeMint(msg.sender, tokenId);
    // }

    function withdrawToken() public onlyOwner {
        tokenAddress.transfer(
            msg.sender,
            tokenAddress.balanceOf(address(this))
        );
    }
}
