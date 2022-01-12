const RiotAPI = require("../api/RiotAPI")

const reformatSentence = (data) => {
  const removeWords = ['games', '3v3', '5v5', '1v1', 'Bots', 'test']
  let { description, map } = data
  if (description == null) description = map
  removeWords.forEach(word => {
    description = description.replace(word, '')
  })
  return description.trim()
}

const queueType = async (queueId) => {
  const queueData = await RiotAPI.queues(queueId)
  const queueName = reformatSentence(queueData)

  return queueName      
}

module.exports = queueType