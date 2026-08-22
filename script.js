class Executor {
    constructor() {
        this.initElements();
        this.bindEvents();
        this.lineNumberUpdate();
    }

    initElements() {
        this.codeEditor = document.getElementById('codeEditor');
        this.lineNumbers = document.getElementById('lineNumbers');
        this.output = document.getElementById('output');
        this.executeBtn = document.getElementById('executeBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.copyBtn = document.getElementById('copyBtn');
        this.pasteBtn = document.getElementById('pasteBtn');
        this.exampleBtn = document.getElementById('exampleBtn');
        this.statusDot = document.getElementById('statusDot');
        this.statusText = document.getElementById('statusText');
    }

    bindEvents() {
        this.executeBtn.addEventListener('click', () => this.executeCode());
        this.clearBtn.addEventListener('click', () => this.clearAll());
        this.copyBtn.addEventListener('click', () => this.copyCode());
        this.pasteBtn.addEventListener('click', () => this.pasteCode());
        this.exampleBtn.addEventListener('click', () => this.loadExample());
        
        this.codeEditor.addEventListener('input', () => this.lineNumberUpdate());
        this.codeEditor.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                e.preventDefault();
                this.insertTab();
            }
        });
    }

    lineNumberUpdate() {
        const lines = this.codeEditor.value.split('\n').length;
        const numbers = Array.from({ length: lines }, (_, i) => i + 1).join('\n');
        this.lineNumbers.textContent = numbers;
    }

    insertTab() {
        const start = this.codeEditor.selectionStart;
        const end = this.codeEditor.selectionEnd;
        this.codeEditor.value = 
            this.codeEditor.value.substring(0, start) + 
            '    ' + 
            this.codeEditor.value.substring(end);
        this.codeEditor.selectionStart = this.codeEditor.selectionEnd = start + 4;
        this.lineNumberUpdate();
    }

    executeCode() {
        const code = this.codeEditor.value.trim();
        
        if (!code) {
            this.showError('⚠️ Vui lòng nhập mã để thực thi!');
            return;
        }

        this.setStatus('running');
        this.clearOutput();
        this.showInfo('⚡ Đang thực thi mã...\n');

        try {
            // Tạo một sandbox environment
            const sandbox = this.createSandbox();
            
            // Thực thi mã với sandbox
            const result = new Function(...Object.keys(sandbox), `return (${code})`)(
                ...Object.values(sandbox)
            );

            // Xử lý kết quả
            if (result !== undefined) {
                this.showSuccess('✅ Kết quả: ' + this.formatResult(result));
            }
            
            this.setStatus('completed');
            this.showInfo('\n✨ Thực thi thành công!');
        } catch (error) {
            this.setStatus('error');
            this.showError('❌ Lỗi: ' + error.message);
        }
    }

    createSandbox() {
        return {
            console: {
                log: (...args) => this.showOutput(args.join(' ')),
                error: (...args) => this.showError(args.join(' ')),
                warn: (...args) => this.showWarning(args.join(' ')),
                info: (...args) => this.showInfo(args.join(' '))
            },
            Math: Math,
            Date: Date,
            JSON: JSON,
            Array: Array,
            Object: Object,
            String: String,
            Number: Number,
            Boolean: Boolean,
            Promise: Promise,
            fetch: fetch.bind(window),
            alert: (msg) => this.showOutput('Alert: ' + msg),
            prompt: (msg) => this.showOutput('Prompt: ' + msg),
        };
    }

    formatResult(result) {
        if (typeof result === 'object') {
            return JSON.stringify(result, null, 2);
        }
        return result;
    }

    clearAll() {
        this.codeEditor.value = '';
        this.lineNumberUpdate();
        this.clearOutput();
        this.setStatus('ready');
        this.codeEditor.focus();
    }

    clearOutput() {
        this.output.innerHTML = '';
    }

    copyCode() {
        const code = this.codeEditor.value;
        if (!code) {
            this.showWarning('⚠️ Không có mã để sao chép!');
            return;
        }
        
        navigator.clipboard.writeText(code).then(() => {
            this.showInfo('📋 Đã sao chép mã vào clipboard!');
        }).catch(() => {
            this.showError('❌ Không thể sao chép mã!');
        });
    }

    pasteCode() {
        navigator.clipboard.readText().then((text) => {
            this.codeEditor.value = text;
            this.lineNumberUpdate();
            this.showInfo('📥 Đã dán mã từ clipboard!');
        }).catch(() => {
            this.showError('❌ Không thể đọc clipboard!');
        });
    }

    loadExample() {
        const examples = [
            `// Ví dụ 1: Tính toán đơn giản
const a = 10;
const b = 20;
const sum = a + b;
console.log("Tổng của " + a + " và " + b + " là: " + sum);
return sum;`,
            
            `// Ví dụ 2: Mảng và vòng lặp
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log("Mảng gốc:", numbers);
console.log("Mảng nhân đôi:", doubled);
return doubled;`,
            
            `// Ví dụ 3: Object và xử lý dữ liệu
const user = {
    name: "Người dùng",
    age: 25,
    skills: ["JavaScript", "HTML", "CSS"]
};
console.log("Thông tin:", user);
console.log("Kỹ năng:", user.skills.join(", "));
return user;`
        ];

        const randomExample = examples[Math.floor(Math.random() * examples.length)];
        this.codeEditor.value = randomExample;
        this.lineNumberUpdate();
        this.showInfo('📝 Đã tải ví dụ mới!');
        this.codeEditor.focus();
    }

    showOutput(message) {
        const div = document.createElement('div');
        div.className = 'output-line';
        div.textContent = message;
        this.output.appendChild(div);
        this.scrollToBottom();
    }

    showError(message) {
        const div = document.createElement('div');
        div.className = 'output-line output-error';
        div.textContent = message;
        this.output.appendChild(div);
        this.scrollToBottom();
    }

    showWarning(message) {
        const div = document.createElement('div');
        div.className = 'output-line output-warning';
        div.textContent = message;
        this.output.appendChild(div);
        this.scrollToBottom();
    }

    showInfo(message) {
        const div = document.createElement('div');
        div.className = 'output-line output-info';
        div.textContent = message;
        this.output.appendChild(div);
        this.scrollToBottom();
    }

    showSuccess(message) {
        const div = document.createElement('div');
        div.className = 'output-line output-success';
        div.textContent = message;
        this.output.appendChild(div);
        this.scrollToBottom();
    }

    setStatus(status) {
        const statusMap = {
            'ready': { text: 'Sẵn sàng', dotClass: '' },
            'running': { text: 'Đang thực thi...', dotClass: 'active' },
            'completed': { text: 'Hoàn thành', dotClass: 'active' },
            'error': { text: 'Có lỗi', dotClass: 'error' }
        };

        const currentStatus = statusMap[status] || statusMap.ready;
        this.statusText.textContent = currentStatus.text;
        this.statusDot.className = 'status-dot ' + currentStatus.dotClass;
    }

    scrollToBottom() {
        const outputContainer = this.output.closest('.output-container');
        if (outputContainer) {
            outputContainer.scrollTop = outputContainer.scrollHeight;
        }
    }
}

// Khởi tạo khi DOM đã sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
    const executor = new Executor();
    
    // Thêm phím tắt
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + Enter để thực thi
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            executor.executeCode();
        }
        
        // Ctrl/Cmd + L để xóa
        if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
            e.preventDefault();
            executor.clearAll();
        }
    });
});
