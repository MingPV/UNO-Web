import Item from "../models/itemModel.js";
import Member from "../models/memberModel.js"


export const createMember = async (req, res) => {
  const newMember = new Member(req.body);
  res.status(201).send(await newMember.save());
};

export const getMembers = async (req, res) => {
  res.status(200).send(await Member.find());
};

export const deleteMember = async (req, res) => {
  const member = await Member.findOne({ _id: req.params.id });
  await Item.deleteMany({ name: member.name });
  await Member.deleteOne({ _id: req.params.id });
  res.status(200).send("OK");
};