// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title ProofOfReality
 * @notice Stores tamper-resistant verification records for digital content authenticity.
 * @dev Each verification record contains a content hash, reality score, verdict, and timestamp.
 *      Only the contract owner (backend service) can register new verifications.
 */
contract ProofOfReality {
    
    // ──────────────────────────────────────────────
    // Data Structures
    // ──────────────────────────────────────────────

    struct Verification {
        string verificationId;      // e.g., "POR-2026-00124"
        string contentHash;         // SHA-256 hash of the content
        uint256 realityScore;       // 0–100
        string verdict;             // e.g., "HIGH_CONFIDENCE_AUTHENTIC"
        uint256 timestamp;          // Block timestamp when registered
        bool exists;                // Whether this record exists
    }

    // ──────────────────────────────────────────────
    // State Variables
    // ──────────────────────────────────────────────

    address public owner;
    uint256 public totalVerifications;

    /// @dev Mapping from verificationId => Verification record
    mapping(string => Verification) private verifications;

    /// @dev Array of all verification IDs for enumeration
    string[] public verificationIds;

    // ──────────────────────────────────────────────
    // Events
    // ──────────────────────────────────────────────

    event VerificationRegistered(
        string indexed verificationId,
        string contentHash,
        uint256 realityScore,
        string verdict,
        uint256 timestamp
    );

    // ──────────────────────────────────────────────
    // Modifiers
    // ──────────────────────────────────────────────

    modifier onlyOwner() {
        require(msg.sender == owner, "ProofOfReality: caller is not the owner");
        _;
    }

    // ──────────────────────────────────────────────
    // Constructor
    // ──────────────────────────────────────────────

    constructor() {
        owner = msg.sender;
    }

    // ──────────────────────────────────────────────
    // Core Functions
    // ──────────────────────────────────────────────

    /**
     * @notice Register a new content verification on-chain.
     * @param _verificationId Unique verification identifier (e.g., "POR-2026-00124")
     * @param _contentHash    SHA-256 hash of the verified content
     * @param _realityScore   Reality score (0–100)
     * @param _verdict        Human-readable verdict string
     */
    function registerVerification(
        string calldata _verificationId,
        string calldata _contentHash,
        uint256 _realityScore,
        string calldata _verdict
    ) external onlyOwner {
        require(!verifications[_verificationId].exists, "ProofOfReality: verification already exists");
        require(_realityScore <= 100, "ProofOfReality: score must be 0-100");
        require(bytes(_verificationId).length > 0, "ProofOfReality: empty verification ID");
        require(bytes(_contentHash).length > 0, "ProofOfReality: empty content hash");

        Verification memory v = Verification({
            verificationId: _verificationId,
            contentHash: _contentHash,
            realityScore: _realityScore,
            verdict: _verdict,
            timestamp: block.timestamp,
            exists: true
        });

        verifications[_verificationId] = v;
        verificationIds.push(_verificationId);
        totalVerifications++;

        emit VerificationRegistered(
            _verificationId,
            _contentHash,
            _realityScore,
            _verdict,
            block.timestamp
        );
    }

    /**
     * @notice Retrieve a verification record by its ID.
     * @param _verificationId The verification ID to look up.
     * @return verificationId The verification ID string.
     * @return contentHash The SHA-256 content hash.
     * @return realityScore The reality score (0-100).
     * @return verdict The verdict string.
     * @return timestamp The block timestamp when registered.
     */
    function getVerification(string calldata _verificationId)
        external
        view
        returns (
            string memory verificationId,
            string memory contentHash,
            uint256 realityScore,
            string memory verdict,
            uint256 timestamp
        )
    {
        require(verifications[_verificationId].exists, "ProofOfReality: verification not found");
        Verification memory v = verifications[_verificationId];
        return (v.verificationId, v.contentHash, v.realityScore, v.verdict, v.timestamp);
    }

    /**
     * @notice Verify whether a given content hash matches the stored hash for a verification.
     * @param _verificationId The verification ID to check against.
     * @param _contentHash    The content hash to compare.
     * @return matches True if hashes match, false otherwise.
     */
    function verifyContentHash(
        string calldata _verificationId,
        string calldata _contentHash
    ) external view returns (bool matches) {
        require(verifications[_verificationId].exists, "ProofOfReality: verification not found");
        return keccak256(bytes(verifications[_verificationId].contentHash)) == keccak256(bytes(_contentHash));
    }

    /**
     * @notice Check if a verification exists.
     * @param _verificationId The verification ID to check.
     * @return True if the verification exists.
     */
    function verificationExists(string calldata _verificationId) external view returns (bool) {
        return verifications[_verificationId].exists;
    }

    /**
     * @notice Get a verification ID by index (for enumeration).
     * @param _index The index in the verificationIds array.
     * @return The verification ID at the given index.
     */
    function getVerificationIdAtIndex(uint256 _index) external view returns (string memory) {
        require(_index < verificationIds.length, "ProofOfReality: index out of bounds");
        return verificationIds[_index];
    }
}
