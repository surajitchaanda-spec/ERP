import { useStudents } from '@/services/masterData';

export function MasterDataPage() {
  const { data } = useStudents();

  return (
    <section className="card">
      <h2>Student Directory</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Admission #</th>
            <th>Guardians</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((student) => (
            <tr key={student.id}>
              <td>
                {student.firstName} {student.lastName}
              </td>
              <td>{student.admissionNumber}</td>
              <td>
                {student.guardians && student.guardians.length > 0
                  ? student.guardians.map((guardian) => guardian.firstName).join(', ')
                  : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
