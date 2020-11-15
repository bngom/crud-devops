# -*- mode: ruby -*-
# vi: set ft=ruby :

class FixGuestAdditions < VagrantVbguest::Installers::RedHat
  def dependencies
      packages = super

      # If there's no "kernel-devel" package matching the running kernel in the
      # default repositories, then the base box we're using doesn't match the
      # latest CentOS release anymore and we have to look for it in the archives...
      if communicate.test('test -f /etc/centos-release && ! yum -q info kernel-devel-`uname -r` &>/dev/null')
          env.ui.warn("[#{vm.name}] Looking for the CentOS 'kernel-devel' package in the release archives...")
          packages.sub!('kernel-devel-`uname -r`', 'http://mirror.centos.org/centos' \
                                                   '/`grep -Po \'\b\d+\.[\d.]+\b\' /etc/centos-release`' \
                                                   '/{os,updates}/`arch`/Packages/kernel-devel-`uname -r`.rpm')
      end

      packages
  end
end

Vagrant.configure("2") do |config|

    # Do not pay attention to this parameter
    if Vagrant.has_plugin?("vagrant-vbguest")
      config.vm.provider :virtualbox do |vb|
        config.vbguest.auto_update = true
      end
    end
    
    # Define the app_server VM
    config.vm.define "app_server" do |server|
      # Specify the Vagrant box to use
      server.vm.box = "centos/7"
      # Specify the VM ip address
      server.vm.network :private_network, ip: "20.20.20.2"
      config.vm.network "forwarded_port", guest: 22, host: 2222, host_ip: "127.0.0.1", id: 'ssh'
      # Sync playbooks in current folder with /vagrant folder in guest
      config.vm.synced_folder ".", "/vagrant", type: "virtualbox"
      # Specify the VM specs when using the Virtualbox provisioner
      server.vm.provider "virtualbox" do |vb|
        vb.name =  "app.server.local"
        # VM RAM in MB
        vb.memory = 2048
        # VM CPUs
        vb.cpus = 1
      end
      config.vm.provider "vmware_desktop" do |vmware|
        vmware.vmx["memsize"] = "2048"
        vmware.vmx["numvcpus"] = "1"
      end
    end
    config.vbguest.installer = FixGuestAdditions

    # Use Vagrant Ansible provisioner
    config.vm.provision "ansible_local" do |ansible|
      # The path to the playbooks entry point
      ansible.playbook = "./iac/playbooks/main.yml"
      # Only run the roles with these tags
      ansible.tags = "install"
    end
  
  end