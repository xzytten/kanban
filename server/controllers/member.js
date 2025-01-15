import Member from '../models/Member.js'
import Project from '../models/Project.js';
import User from '../models/User.js';

export const addMember = async (req, res) => {
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

export const getMember = async (req, res) => {
    try {
        const { projectId } = req.params;
        
        const project  = await Project.findById(projectId)
        console.log(project)

        if(!project){
            res.status(400).json({
                message: 'Project not found'
            });
        }
        
        const members = await Member.find({ _id: { $in: [...project.member, project.author] } });

        const membersWithNames = [];

        for (const member of members) {
            const user = await User.findById(member.userId);

            if (user) {
                const memberWithName = {
                    _id: member._id,
                    userId: member.userId,
                    position: member.position,
                    roles: member.roles,
                    createdAt: member.createdAt,
                    solved: member.solved,
                    notInTime: member.notInTime,
                    updatedAt: member.updatedAt,
                    __v: member.__v,
                    userName: user.name  
                };
                membersWithNames.push(memberWithName);
            }
        }

        res.json({ member: membersWithNames });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};