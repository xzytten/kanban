import Member from '../models/Member.js'
import User from '../models/User.js';

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

export const getMember = async (req, res) => {
    try {
        const { memberIds } = req.body;
        console.log(memberIds);

        // Знаходження користувачів з таблиці Member за їхніми айді
        const members = await Member.find({ _id: { $in: memberIds } });

        // Масив для зберігання даних про користувачів з їхніми іменами
        const membersWithNames = [];

        // Проходження через кожен запис про користувача з таблиці Member
        for (const member of members) {
            // Знаходження користувача з таблиці User за його userId
            const user = await User.findById(member.userId);

            // Якщо користувач знайдений, додати його дані разом з ім'ям до масиву membersWithNames
            if (user) {
                const memberWithName = {
                    _id: member._id,
                    userId: member.userId,
                    position: member.position,
                    roles: member.roles,
                    createdAt: member.createdAt,
                    updatedAt: member.updatedAt,
                    __v: member.__v,
                    userName: user.name // Додано ім'я користувача до об'єкту member
                };
                membersWithNames.push(memberWithName);
            }
        }

        // Відправити відповідь JSON зі списком користувачів, які мають імена
        res.json({ member: membersWithNames });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};