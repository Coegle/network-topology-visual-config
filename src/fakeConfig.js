const IPAddrConfigs = [
  {
    router: 'R1',
    IPAddrConfig: [
      {
        name: 'FastEthernet0/0',
        abbr: 'f0/0',
        state: 'up',
        ipAddr: '192.168.0.1',
        ipMask: '255.255.255.0'
      },
      {
        name: 'FastEthernet0/1',
        abbr: 'f0/1',
        state: 'up'
      },
      {
        name: 'Serial0/0/0',
        abbr: 's0/0/0',
        state: 'up'
      },
      {
        name: 'Serial0/0/1',
        abbr: 's0/0/1',
        state: 'up'
      }
    ]
  },
  {
    router: 'R2',
    IPAddrConfig: [
      {
        name: 'FastEthernet0/0',
        abbr: 'f0/0',
        state: 'up',
      },
      {
        name: 'FastEthernet0/1',
        abbr: 'f0/1',
        state: 'up',
        ipAddr: '192.168.0.1',
        ipMask: '255.255.255.0'
      },
      {
        name: 'Serial0/0/0',
        abbr: 's0/0/0',
        state: 'up'
      },
      {
        name: 'Serial0/0/1',
        abbr: 's0/0/1',
        state: 'up'
      }
    ]
  },
  {
    router: 'R3',
    IPAddrConfig: [
      {
        name: 'FastEthernet0/0',
        abbr: 'f0/0',
        state: 'up'
      },
      {
        name: 'FastEthernet0/1',
        abbr: 'f0/1',
        state: 'up'
      },
      {
        name: 'Serial0/0/0',
        abbr: 's0/0/0',
        state: 'up',
        ipAddr: '192.168.0.1',
        ipMask: '255.255.255.0'
      },
      {
        name: 'Serial0/0/1',
        abbr: 's0/0/1',
        state: 'up'
      }
    ]
  }
]

// 如果没有连接后端时为 true
const FakeBackend = true

export default { IPAddrConfigs, FakeBackend }