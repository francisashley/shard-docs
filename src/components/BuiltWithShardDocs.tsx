import React from 'react'
import './BuiltWithShardDocs.scss'

const BuiltWithShardDocs = () => {
  return (
    <footer className="BuiltWithShardDocs">
      Built with{' '}
      <a
        aria-label="Built with shard docs"
        className="BuiltWithShardDocs__link"
        href="https://fa-repo.github.io/shard-docs/#/docs"
      >
        @fa-repo/shard-docs
      </a>
    </footer>
  )
}

BuiltWithShardDocs.propTypes = {}

BuiltWithShardDocs.defaultProps = {}

export default BuiltWithShardDocs
