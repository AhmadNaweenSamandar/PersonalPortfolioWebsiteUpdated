// we will use map data structure for chat history
// gemini doesn't allow to restore individual messages, we need to retrive them all once
// so we create an array for previous messages
// mapping conversationId -> array of messages
// conv1 -> [1,2,3,5]

//this is implementation details we don't expose this
const conversationStore = new Map<string, any[]>()



//instead we create public interfaces and we expose them
export class ChatRepository{

// Retrieve history (or empty array if new)
  async getHistory(conversationId: string): Promise<any[]> {
    return conversationStore.get(conversationId) || [];
  }

  // Save updated history
  async saveHistory(conversationId: string, history: any[]): Promise<void> {
    conversationStore.set(conversationId, history);
  }



}


