import {
  useGetCandidatesQuery,
  useVoteForCandidateMutation,
} from "../features/votingApi";

const CandidatesList = () => {
  const {
    data: candidates,
    refetch,
    error,
    isLoading,
  } = useGetCandidatesQuery();
  const [voteForCandidate] = useVoteForCandidateMutation();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occured</div>;

  const handleVote = async (candidateId: string) => {
    await voteForCandidate(candidateId).unwrap();
    refetch();
  };

  return (
    <ul>
      {candidates?.map((candidate) => (
        <li key={candidate.id}>
          {candidate.name} - Votes: {candidate.votes}
          <button type="button" onClick={() => handleVote(candidate.id)}>
            Vote
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CandidatesList;
