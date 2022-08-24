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

contract MonsterNFT is ERC721URIStorage {
    // using Counters for Counters.Counter;
    // imports interface for erc20 token from IERC20
    // IERC20 public tokenAddress;
    // uint256 public tokenRate = 15 * 10**18;
    uint256 tokenCount;
    // create an event to be invoked in the the create function
    event CreatedSVGNFT(uint256 indexed tokenId, string tokenURI);

    // Counters.Counter private _tokenIdCounter;

    // constructor(address _tokenAddress) ERC721("MonsterNFT", "MFT") {
    //     // _tokenAddress is typecast into an IERC20 variable type
    //     tokenAddress = IERC20(_tokenAddress);
    // }

    constructor() ERC721("MonsterNFT", "MFT") {
        // _tokenAddress is typecast into an IERC20 variable type
        // tokenAddress = IERC20(_tokenAddress);
        tokenCount = 0;
    }

    function create(string memory _svg) public {
        _safeMint(msg.sender, tokenCount);
        // SVG needs to become a token URI (Unique Resource Identifier)
        // this is the image URI
        string memory imgURI = svgToImageURI(_svg);
        // call the format token URI
        string memory tokenURI = formatTokenURI(imgURI);
        _setTokenURI(tokenCount, tokenURI);
        tokenCount = tokenCount + 1;
        // tokenAddress.transferFrom(msg.sender, address(this), tokenRate);
        // uint256 tokenId = _tokenIdCounter.current();
        // _tokenIdCounter.increment();
        emit CreatedSVGNFT(tokenCount, tokenURI);
    }

    // function to make svg image readable in the create function to mint the NFT
    function svgToImageURI(string memory _svg)
        public
        pure
        returns (string memory)
    {
        // using the openzep base64 contract as a util
        string memory baseURL = "data:image/svg+xml;base64,";
        string memory svgToBase64 = Base64.encode(
            bytes(string(abi.encodePacked(_svg)))
        );
        // concat the baseURL and svgToBase64
        return string(abi.encodePacked(baseURL, svgToBase64));
    }

    // function formatTokenURI(string memory _imgURI)
    //     public
    //     pure
    //     returns (string memory)
    // {
    //     // define base url to concatenate the base64 encoded json which takes the imageURI
    //     string memory baseURL = "data:application/json;base64,";
    //     // concatenate the baseURL and the json
    //     return
    //         string(
    //             abi.encodePacked(
    //                 baseURL,
    //                 // format outputted json to base64 for tokenURI. abi.encodePacked concatenates the imageURI variable
    //                 Base64.encode(
    //                     bytes(
    //                         abi.encodePacked(
    //                             '{"name": "SVG NFT", "description": "An example", "attributes": "", "image": "',
    //                             _imgURI,
    //                             '"}'
    //                         )
    //                     )
    //                 )
    //             )
    //         );
    // }

    function formatTokenURI(string memory _imageURI)
        public
        pure
        returns (string memory)
    {
        //Create a json of the token URI, which is the metadata and image URI
        //Concat the two strings like in svgToImage
        //string(abi.encodePacked(Base64.encode(bytes(string(abi.encodePacked(svg)))))
        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name": "SVG NFT", ', // You can add whatever name here
                                '"description": "An NFT based on SVG!", ',
                                '"attributes": "", ',
                                '"image": "',
                                _imageURI,
                                '"}'
                            )
                        )
                    )
                )
            );
    }

    // function safeMint() public {
    //     tokenAddress.transferFrom(msg.sender, address(this), tokenRate);
    //     uint256 tokenId = _tokenIdCounter.current();
    //     _tokenIdCounter.increment();
    //     _safeMint(msg.sender, tokenId);
    // }

    // function withdrawToken() public onlyOwner {
    //     tokenAddress.transfer(
    //         msg.sender,
    //         tokenAddress.balanceOf(address(this))
    //     );
    // }
}
