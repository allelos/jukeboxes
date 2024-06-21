import Image from "next/image"
import styles from "@styles/controls.module.css"

type StationInformationProp = {
  name: string
  imageSrc?: string
  error: boolean
  genre: string
}

function StationInformation({ name, imageSrc, error, genre }: StationInformationProp) {
  if (!name) return null

  return (
    <div className={styles.information}>
      {imageSrc && (
        <Image
          src={imageSrc}
          alt="Radio station logo"
          width={80}
          height={80}
          className={`${styles.image} ${error && styles.error}`}
        />
      )}
      <div className={styles.header}>
        <h2>{name}</h2>
        <h4>{genre}</h4>
        {error && <h4>Offline</h4>}
      </div>
    </div>
  )
}

export default StationInformation
