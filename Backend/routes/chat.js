import express from "express";
import Thread from "../models/Thread.js";
import getOpenAIAPIResponse from "../utils/openai.js";
const router = express.Router();
router.post("/test", async (req, res) => {
  try {
    const thread = new Thread({
      threadId: "abcde",
      title: "Testing new Thread",
    });
    const response = await thread.save();
    res.json(response);
  } 
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save thread" });
  }
});
router.get("/thread", async (req, res) => {
  try {
    const threads = await Thread.find({}).sort({ updatedAt: -1 });
    res.json(threads);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch threads" });
  }
});
router.get("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;
  try {
    const thread = await Thread.findOne({ threadId });
    if (!thread) {
      return res.status(404).json({ error: "Thread not found" });
    }
    return res.json(thread.messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/thread/:threadId",async(req,res)=>{
    const {threadId}=req.params;
    try{
        const deletedThread=await Thread.findOneAndDelete({threadId});
        if(!deletedThread){
            res.status(400).json({error:"Thread could not be deleted"});
        }
        res.status(200).json({success:"Thread Deleted Successfully"});
    }
    catch(err){
        console.log(err);
    }
});
router.post("/chat", async (req, res) => {
  const { threadId, message } = req.body;
  if (!threadId || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }
  try {
    let thread = await Thread.findOne({ threadId });
    if (!thread) {
      thread = new Thread({
        threadId,
        title: message,
        messages: [{ role: "user", content: message }]
      });
    } 
    else {
      thread.messages.push({ role: "user", content: message });
    }
    const aiResponse = await getOpenAIAPIResponse(message);
    const assistantText =aiResponse?.choices?.[0]?.message?.content;
    if (!assistantText) {
      return res.status(500).json({ error: "AI response empty" });
    }
    thread.messages.push({
      role: "assistant",
      content: assistantText
    });
    thread.updatedAt = new Date();
    await thread.save();
    res.json({ reply: assistantText });
  } 
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Chat failed" });
  }
});
export default router;