document.addEventListener('DOMContentLoaded', function() {
    // 页面加载完成后立即初始化命令执行和系统状态动画
    // 这样不需要等待用户点击标签
    setTimeout(function() {
        initializeAllAnimations();
    }, 500);
    
    // 页面滚动效果
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.padding = "15px 0";
            header.style.background = "rgba(12, 12, 29, 0.95)";
        } else {
            header.style.padding = "20px 0";
            header.style.background = "rgba(12, 12, 29, 0.8)";
        }
    });

    // 移动导航菜单
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            
            if (mainNav.classList.contains('active')) {
                mainNav.style.display = 'block';
                setTimeout(() => {
                    mainNav.style.opacity = '1';
                    mainNav.style.transform = 'translateY(0)';
                }, 10);
            } else {
                mainNav.style.opacity = '0';
                mainNav.style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    mainNav.style.display = 'none';
                }, 300);
            }
        });
    }

    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 关闭移动菜单（如果打开）
            if (mainNav && mainNav.classList.contains('active')) {
                mobileNavToggle.click();
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 标签切换功能初始化
    initTabSwitching();

    // 表单提交处理
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(this);
            const formValues = {};
            
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            // 在实际应用中，这里应该发送数据到服务器
            // 这里只是模拟提交成功
            
            // 清空表单
            this.reset();
            
            // 显示成功消息
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success-message';
            successMessage.textContent = '消息已发送，我们会尽快回复您！';
            successMessage.style.color = '#2ecc71';
            successMessage.style.padding = '15px';
            successMessage.style.marginTop = '20px';
            successMessage.style.textAlign = 'center';
            successMessage.style.borderRadius = '10px';
            successMessage.style.backgroundColor = 'rgba(46, 204, 113, 0.1)';
            successMessage.style.border = '1px solid rgba(46, 204, 113, 0.3)';
            
            this.appendChild(successMessage);
            
            // 3秒后移除成功消息
            setTimeout(() => {
                successMessage.style.opacity = '0';
                setTimeout(() => {
                    successMessage.remove();
                }, 300);
            }, 3000);
        });
    }

    // 初始化ScrollReveal动画效果
    try {
        const sr = ScrollReveal({
            origin: 'bottom',
            distance: '50px',
            duration: 1000,
            delay: 200,
            reset: false
        });

        // 为各部分添加滚动显示动画
        sr.reveal('.hero-content', { origin: 'left' });
        sr.reveal('.hero-image', { origin: 'right', delay: 400 });
        
        sr.reveal('.feature-card', { interval: 100 });
        sr.reveal('.architecture-image', { origin: 'left' });
        sr.reveal('.architecture-text', { origin: 'right', delay: 300 });
        
        sr.reveal('.security-card', { interval: 100 });
        sr.reveal('.tab-header', { origin: 'top' });
        sr.reveal('.demo-animation', { delay: 300 });
        sr.reveal('.demo-description', { delay: 500 });
        
        sr.reveal('.footer-logo', { origin: 'top' });
        sr.reveal('.footer-links', { origin: 'bottom', delay: 300 });
    } catch (err) {
        console.log('ScrollReveal初始化失败，但不影响页面功能', err);
    }

    // 初始化设备列表动画
    initDeviceListAnimation();

    // 初始化所有标签页的动画
    function initializeAllAnimations() {
        // 预先初始化所有标签页的动画
        startCommandAnimation();
        startSystemMonitorAnimation();
        
        // 标签页切换后也重新初始化动画
        document.querySelectorAll('.tab-item').forEach(item => {
            item.addEventListener('click', function() {
                const tab = this.getAttribute('data-tab');
                if (tab === 'tab2') {
                    setTimeout(() => startCommandAnimation(), 100);
                } else if (tab === 'tab3') {
                    setTimeout(() => startSystemMonitorAnimation(), 100);
                }
            });
        });
    }

    // 初始化标签切换功能
    function initTabSwitching() {
        const tabItems = document.querySelectorAll('.tab-item');
        const tabPanes = document.querySelectorAll('.tab-pane');
        
        tabItems.forEach(tab => {
            tab.addEventListener('click', function() {
                // 移除所有活动类
                tabItems.forEach(item => item.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                // 添加活动类到当前元素
                this.classList.add('active');
                
                // 显示相应的内容面板
                const targetTab = this.getAttribute('data-tab');
                const targetPane = document.getElementById(targetTab);
                if (targetPane) {
                    targetPane.classList.add('active');
                }
            });
        });
    }

    // 初始化设备列表动画
    function initDeviceListAnimation() {
        const addDeviceBtn = document.getElementById('addDeviceBtn');
        const refreshBtn = document.getElementById('refreshBtn');
        
        if (addDeviceBtn) {
            addDeviceBtn.addEventListener('click', function() {
                const deviceList = document.querySelector('.device-list-animation');
                const newDevice = document.createElement('div');
                newDevice.className = 'device-item online';
                newDevice.innerHTML = `
                    <span class="device-name">电脑-新设备-${Math.floor(Math.random() * 100)}</span>
                    <span class="device-status"><i class="bi bi-circle-fill"></i> 在线</span>
                    <span class="device-ip">192.168.1.${Math.floor(Math.random() * 100 + 100)}</span>
                    <span class="device-info">Windows 10</span>
                `;
                newDevice.style.opacity = '0';
                newDevice.style.transform = 'translateY(20px)';
                deviceList.appendChild(newDevice);
                
                setTimeout(() => {
                    newDevice.style.opacity = '1';
                    newDevice.style.transform = 'translateY(0)';
                }, 10);
            });
        }
        
        if (refreshBtn) {
            refreshBtn.addEventListener('click', function() {
                const deviceItems = document.querySelectorAll('.device-item');
                deviceItems.forEach(item => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        // 随机状态
                        const statuses = ['online', 'offline', 'soon'];
                        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
                        
                        item.className = `device-item ${randomStatus}`;
                        
                        const statusText = {
                            'online': '在线',
                            'offline': '离线',
                            'soon': '连接中'
                        };
                        
                        item.querySelector('.device-status').innerHTML = `<i class="bi bi-circle-fill"></i> ${statusText[randomStatus]}`;
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 500);
                });
            });
        }
    }

    // 命令执行动画
    function startCommandAnimation() {
        console.log("启动命令执行动画");
        const typingCommand = document.getElementById('typingCommand');
        const terminalOutput = document.getElementById('terminalOutput');
        const commandBtns = document.querySelectorAll('.command-btn');
        
        if (!typingCommand || !terminalOutput) {
            console.log("找不到命令执行相关元素", {typingCommand, terminalOutput});
            return;
        }
        
        // 清空之前的输出
        terminalOutput.innerHTML = '';
        
        // 模拟命令输出
        setTimeout(() => {
            terminalOutput.innerHTML = `
                主机名:           DESKTOP-AB123CD
                OS 名称:          Microsoft Windows 10 专业版
                OS 版本:          10.0.19045 Build 19045
            `;
        }, 1000);
        
        // 添加命令按钮监听
        commandBtns.forEach(btn => {
            // 移除之前的事件监听器，防止重复
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            
            newBtn.addEventListener('click', function() {
                const command = this.getAttribute('data-command');
                
                // 清空之前的输出
                terminalOutput.innerHTML = '';
                
                // 显示新命令
                typingCommand.textContent = getCommandText(command);
                
                // 模拟输出
                setTimeout(() => {
                    terminalOutput.innerHTML = getCommandOutput(command);
                }, 800);
            });
        });
    }
    
    function getCommandText(command) {
        switch(command) {
            case 'systeminfo':
                return 'systeminfo | findstr /B "主机名 OS名称 OS版本"';
            case 'tasklist':
                return 'tasklist | findstr "explorer chrome"';
            case 'shutdown':
                return 'shutdown /s /t 60 /c "系统将在60秒后关机"';
            case 'restart':
                return 'shutdown /r /t 60 /c "系统将在60秒后重启"';
            default:
                return command;
        }
    }
    
    function getCommandOutput(command) {
        switch(command) {
            case 'systeminfo':
                return `
                    主机名:           DESKTOP-AB123CD
                    OS 名称:          Microsoft Windows 10 专业版
                    OS 版本:          10.0.19045 Build 19045
                `;
            case 'tasklist':
                return `
                    explorer.exe                  4512 Console                 1     32,768 K
                    chrome.exe                    8756 Console                 1    325,540 K
                    chrome.exe                    9012 Console                 1    125,760 K
                    chrome.exe                    2348 Console                 1     88,420 K
                `;
            case 'shutdown':
                return `
                    正在计划系统关机。
                    系统将在60秒后关机。
                    注销原因: 系统将在60秒后关机
                `;
            case 'restart':
                return `
                    正在计划系统重启。
                    系统将在60秒后重启。
                    注销原因: 系统将在60秒后重启
                `;
            default:
                return `命令 '${command}' 执行成功。`;
        }
    }

    // 系统监控动画
    function startSystemMonitorAnimation() {
        console.log("启动系统状态监控动画");
        const cpuGauge = document.getElementById('cpuGauge');
        const memoryGauge = document.getElementById('memoryGauge');
        const cpuValue = document.getElementById('cpuValue');
        const memoryValue = document.getElementById('memoryValue');
        const alertsContainer = document.querySelector('.system-alerts');
        const monitorDevice = document.getElementById('monitorDevice');
        
        if (!cpuGauge || !memoryGauge || !cpuValue || !memoryValue) {
            console.log("找不到系统监控相关元素", {cpuGauge, memoryGauge, cpuValue, memoryValue});
            return;
        }
        
        // 初始化仪表盘位置
        cpuGauge.style.height = "0%";
        memoryGauge.style.height = "0%";
        
        // 初始值
        let cpu = 0;
        let memory = 0;
        
        // 动画函数
        function animateGauges() {
            // 随机增减CPU使用率
            cpu = Math.max(5, Math.min(95, cpu + (Math.random() * 20 - 10)));
            // 随机增减内存使用率
            memory = Math.max(20, Math.min(90, memory + (Math.random() * 10 - 5)));
            
            // 更新仪表盘
            cpuGauge.style.height = `${cpu}%`;
            cpuValue.textContent = `${Math.round(cpu)}%`;
            
            memoryGauge.style.height = `${memory}%`;
            memoryValue.textContent = `${Math.round(memory)}%`;
            
            // 随机添加系统警报
            if (Math.random() < 0.1) {
                addSystemAlert();
            }
            
            // 继续动画
            setTimeout(animateGauges, 2000);
        }
        
        // 启动动画
        setTimeout(() => {
            animateGauges();
            // 初始化磁盘图表动画
            animateDiskChart();
        }, 100);
        
        // 监听设备选择
        if (monitorDevice) {
            // 移除之前的事件监听器，防止重复
            const newMonitorDevice = monitorDevice.cloneNode(true);
            monitorDevice.parentNode.replaceChild(newMonitorDevice, monitorDevice);
            
            newMonitorDevice.addEventListener('change', function() {
                // 重置值并重新开始动画
                cpu = Math.floor(Math.random() * 50);
                memory = Math.floor(Math.random() * 40 + 20);
                
                // 清空警报
                if (alertsContainer) {
                    alertsContainer.innerHTML = '';
                    addSystemAlert('已切换监控设备');
                }
                
                // 重新初始化图表
                const diskChart = document.getElementById('diskChart');
                if (diskChart) {
                    diskChart.innerHTML = '';
                    for (let i = 0; i < 6; i++) {
                        const bar = document.createElement('div');
                        bar.className = 'chart-bar';
                        bar.style.height = `${Math.floor(Math.random() * 60)}%`;
                        diskChart.appendChild(bar);
                    }
                }
            });
        }
    }
    
    function animateDiskChart() {
        const bars = document.querySelectorAll('.chart-bar');
        
        bars.forEach(bar => {
            const newHeight = Math.floor(Math.random() * 60) + 5;
            bar.style.height = `${newHeight}%`;
        });
        
        setTimeout(animateDiskChart, 1500);
    }
    
    function addSystemAlert(message) {
        const alertsContainer = document.querySelector('.system-alerts');
        if (!alertsContainer) return;
        
        const now = new Date();
        const timeString = now.getHours().toString().padStart(2, '0') + ':' + 
                          now.getMinutes().toString().padStart(2, '0') + ':' + 
                          now.getSeconds().toString().padStart(2, '0');
        
        const alertMessages = [
            '系统运行正常',
            'CPU使用率峰值超过80%',
            '内存使用率持续增长',
            '磁盘I/O活动频繁',
            '网络连接稳定',
            '系统已完成自检',
            '后台服务启动',
            '存储空间充足',
            '新设备连接',
            '正在执行计划任务'
        ];
        
        const alert = document.createElement('div');
        alert.className = 'alert-item';
        alert.innerHTML = `
            <i class="bi bi-info-circle"></i>
            <span class="alert-message">${message || alertMessages[Math.floor(Math.random() * alertMessages.length)]}</span>
            <span class="alert-time">${timeString}</span>
        `;
        
        // 添加到顶部
        alertsContainer.insertBefore(alert, alertsContainer.firstChild);
        
        // 限制最大数量
        if (alertsContainer.children.length > 5) {
            alertsContainer.removeChild(alertsContainer.lastChild);
        }
    }
}); 