import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Candidate } from "../types";

export const votingApi = createApi({
	reducerPath: "votingApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
	endpoints: (builder) => ({
		getCandidates: builder.query<Candidate[], void>({
			query: () => "candidates",
		}),
		voteForCandidate: builder.mutation<Candidate, string>({
			queryFn: async (candidateId) => {
				const response = await fetch(
					`http://localhost:5000/candidates/${candidateId}`,
				);
				if (!response.ok) {
					return {
						error: { status: response.status, data: "Candidate not found" },
					};
				}
				const candidate: Candidate = await response.json();
				const updatedCandidate = { ...candidate, votes: candidate.votes + 1 };

				const updateResponse = await fetch(
					`http://localhost:5000/candidates/${candidate.id}`,
					{
						method: "PATCH",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ votes: updatedCandidate.votes }),
					},
				);
				if (!updateResponse.ok) {
					return {
						error: {
							status: updateResponse.status,
							data: "Failed to update candidate",
						},
					};
				}
				return {
					data: updatedCandidate,
				};
			},
		}),
	}),
});

export const { useGetCandidatesQuery, useVoteForCandidateMutation } = votingApi;
