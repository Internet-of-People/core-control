# Core v2 Management Tool (git install)

## Installation

> IMPORTANT: We only support Ubuntu 18.04LTS and Ubuntu 20.04 LTS

```sh
git clone https://github.com/Internet-of-People/core-control -b master
```

## Important Change from 2.6.10

In 2.6.10 we made three breaking changes.

1. You only have to use the `master` branch from now. The `develop` branch is for development only and contains changes that might ruin your live production.
2. You need to prepend the `ccontrol` with a `NETWORK` environment set. See in the next section.

### How to Upgrade from 2.5.19 to 2.6.10

If you ran only a relay node, you have nothing to do here. Only, if you ran a forger as well.

1. Move to `master` branch.

   ```bash
   git fetch
   git checkout master
   ```
  
1. Upgrade the core-control

   ```bash
   $ export NETWORK=[mainnet|devnet] && ./ccontrol.sh update self
   ```

1. Upgrade Hydra Core

   ```bash
   $ export NETWORK=[mainnet|devnet] && ./ccontrol.sh update core
   ```

1. Stop all

   ```bash
   $ export NETWORK=[mainnet|devnet] && ./ccontrol.sh stop all
   ```

1. If you ran both a relay and a forger, then start all with `all`

   ```bash
   $ export NETWORK=[mainnet|devnet] && ./ccontrol.sh start all
   ```

## Core Control Usage

```sh
cd core-control
export NETWORK=[devnet|mainnet] && ./ccontrol.sh arg1 [arg2]
```

| arg1 | arg2 | Description |
| --- | --- | --- |
| `install` | `core` | Install Core |
| `update` | `core`/`self`/`check` | Update Core / Core-Control / Check |
| `remove` | `core`/`self` | Remove Core / Core-Control |
| `secret` | `set`/`clear` | Delegate Secret Set / Clear |
| `start` | `relay`/`forger`/`all` | Start Core Services |
| `restart` | `relay`/`forger`/`all`/`safe` | Restart Core Services |
| `stop` | `relay`/`forger`/`all` | Stop Core Services |
| `status` | `relay`/`forger`/`all` | Show Core Services Status |
| `logs` | `relay`/`forger`/`all` | Show Core Logs |
| `snapshot` | `create`/`restore` | Snapshot Create / Restore |
| `system` | `info`/`update` | System Info / Update |
| `config` | `reset` | Reset Config Files to Defaults |
| `database` | `clear` | Clear the Database |
| `rollback` | | Rollback to Specified Height |
| `plugin` | `list`/`add`/`remove`/`update` | Manage Core Plugins |

## General

This is a Streamlined CLI-Based Core v2 Management Tool.

- **Do not run as root!**
- Installs fail2ban for ssh, and ufw allowing only port 22(ssh) and the cores ports.
- For start/restart/stop/status/logs you can skip the 'all' argument as it's the default.
- For install/remove you can skip the 'core' argument as it's the default.
- For update you can skip the 'check' argument as it's the default.
- For system you can skip the 'info' argument as it's the default.
- For plugin you can skip the 'list' argument as it's the default.
- Using the 'restart safe' arguments requires the round-monitor core plugin and restarts the core services when safe to do so in 
order to avoid missing a block.
- When setting a delegate secret just type your secret after the 'set' argument without quotes.

  ```bash
  # Example
  export NETWORK=[devnet|mainnet] && ./ccontrol.sh secret set one two three four five six seven eight nine ten eleven twelve
  ```

- When doing a rollback just type the desired height after the 'rollback' argument.
- Rollback will stop the running processes, do the rollback and start the processes that were online.
- The script adds an alias named 'ccontrol' on first run. On your next shell login you'll be able to call the script from anywhere
using: ccontrol arg1 [arg2]. It also has autocomplete functionality for all possible arguments.
- Using the 'config reset' arguments will stop the core processes, delete your existing configs and replace them with the defaults.
If you're running a forger and/or have custom settings, you should add them again.
- Using the 'database clear' arguments will stop the core processes, wipe the database clean, and start the processes that were online before.
The end result is that your node will start syncing from 0.
- For plugin management just type the name of the plugin after 'plugin add/remove/update' as it appears in the list.
- On first run the tool exposes the core-cli with the project name, e.g. ark for project Ark. It will be accessible after logout.

## Changelog

### 2.6.31+p3

- Upgraded to 4.0.4 SSI (project Morpheus, previously called DAC)
- Added DNS (project Coeus)

### 2.6.31+p2

- Upgrade to 3.1.1 DAC (project Morpheus)

### 2.6.31+p1

- DAC transactions are more cheap now.
- Upgrade to 2.0.6 DAC (project Morpheus).
- API rate limit increased.
- BUGFIX: you may saw a lot of `MORPHEUS Trying to attach Morpheus HTTP API...` in the forger's log. That's now fixed.

#### How to update from 2.6.31

```bash
$ export NETWORK=[devnet|mainnet] && ./ccontrol.sh update self
$ export NETWORK=[devnet|mainnet] && ./ccontrol.sh update core
$ export NETWORK=[devnet|mainnet] && ./ccontrol.sh stop all
$ export NETWORK=[devnet|mainnet] && ./ccontrol.sh start [relay|forger|all]
```

### 2.6.31

- reverted back forger handling. Most of you complaint about how this 3rd party tool handles forger starting, so we reverted it back to the original flow. With this release you can start your forger separately again.
- Upgrade to 2.6.31 Hydra Core
- Upgrade to 2.0.5 DAC (project Morpheus)

#### How to update from 2.6.10

```bash
$ export NETWORK=[devnet|mainnet] && ./ccontrol.sh update self
$ export NETWORK=[devnet|mainnet] && ./ccontrol.sh update core
$ export NETWORK=[devnet|mainnet] && ./ccontrol.sh stop all
$ export NETWORK=[devnet|mainnet] && ./ccontrol.sh start [relay|forger|all]
```

### 2.6.10 - MANDATORY RELEASE

- updated for core 2.6.10
- `ccontrol.sh` now requires a `NETWORK` environment variable set to be either `devnet` or `mainnet`. See the installation guide.

Note: it's a mandatory update!

**To be able to use the latest core-control and Hydra Core, follow these steps:**

1. `cd core-control`
1. `git checkout master`
1. `export NETWORK=[devnet|mainnet] && ./ccontrol update core`

### 2.5.1

- added restart safe option
- use restart safe on update if all requirements are met
- added plugin manager
- snapshot now uses the core-snapshot interface

### 2.5

- updated for core 2.5

### 2.4

- fixed a bug in config reset
- added log level file
- renamed json rpc
- added wallet api
- updated for core 2.4

### 2.3

- added database clear functionality
- expose the core-cli as the project name
- added rollback functionality
- updated for core 2.3

### 2.2

- updated for core 2.2

### 2.1

- made 'update core' a lot smarter
- bump version to match core major version
- added status argument to show process status

### 0.7

- added a splash of color
- added update check to show update availability
- the ccontrol alias now has autocomplete for all arguments
- refactored some operations for consistency
- core remove is now done with 'remove core'
- added self-remove as an otion with 'remove self'
- moved miscellaneous variables and checks to misc.sh
- core update is now done with 'update core'
- added self-update as an otion with 'update self'
- removed automatic self-update

### 0.6

- added delegate secret management
- added local snapshot management
- added process restart capability
- automatically adds alias 'ccontrol' on first run
- standardize the script name and alias to 'ccontrol'
- added hostname and IP data to system info
- Made error messages easier to understand
- added config reset capability

### 0.5

- added system update
- added logs display
- network name is now pulled from .env for simpler commands
- renamed main script to cc.sh
- added devbranch variable to project.conf
- added automatic tool update from git
- renamed uninstall to remove
- added fail2ban (with default ssh protection)
- added ufw with configuration for ssh and the core ports in use
- reconfigure sshd_config with PermitRootLogin prohibit-password
- added pm2 logrotate module
- pm2 now starts on boot and saves process state after start/stop

### 0.4

- added system information

### 0.3

- added mainnet and devnet update procedures

### 0.2

- refactored code with a config file for easy migration to core v2 bridgechains

### 0.1

- initial release

## Security

If you discover a security vulnerability within this package, please open an issue. All security vulnerabilities will be promptly addressed.

## Credits

- [All Contributors](../../contributors)
- [Georgi Stoyanov](https://github.com/geopsllc)

## License

[MIT](LICENSE) © [geopsllc](https://github.com/geopsllc)
