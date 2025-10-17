
// This custom component takes in an assignment prop
// and displays the assignment title inside a styled card.

const AssignmentCard = ({ assignment }) => {
  return (
    <div>
      <p>{assignment.title}</p>
    </div>
  )
}

export default AssignmentCard
