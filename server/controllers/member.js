import Member from '../models/Member.js'

export const postMember = async (req, res) => {
    try {
        const { userId } = req.body;

        const newMember = new Member({
            userId
        })

        await newMember.save();

        res.json({
            newMember,
            message: "Subtask added"
        })

    } catch (error) {
        res.json({
            meassage: 'error'
        })
    }
}

export const getAllMember = async (req, res) => {
    try {
        const { projectId } = req.body;

        const members = await Member.find({ projectId });

        res.json({ members })
    } catch (error) {
        res.json({
            meassage: 'error'
        })
    }
}