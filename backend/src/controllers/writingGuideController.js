export const getAllAssignments = async (req, res) => {
    res.status(200).send("You fetched all assignments.");
};

export const createAssignment = async (req, res) => {
    res.status(201).json({ message: "Assignment created successfully." });
};

export const updateAssignment = async (req, res) => {
    res.status(200).json({ message: "Assignment updated successfully." });
};

export const deleteAssignment = async (req, res) => {
    res.status(200).json({ message: "Assignment deleted successfully." });
};