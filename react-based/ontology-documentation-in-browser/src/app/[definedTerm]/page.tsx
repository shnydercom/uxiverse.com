export default function Page({ params }: { params: { definedTerm: string } }) {
    return <p>Post: {params.definedTerm}</p>
}