export default function Logo({width = 70}: {width?: number}) {
  return (
    <div className="logo">
      <img src={import.meta.env.BASE_URL + "logo.svg"} alt="Logo" width={width} />
    </div>
  )
}