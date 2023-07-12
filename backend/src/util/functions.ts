import { ParticipantPopulated } from "./types.js";

export const userIsConversationParticipant = (
  participants: Array<ParticipantPopulated>,
  userId: string
): boolean => {
  return !!participants.find((participant) => participant.userId === userId);
};
